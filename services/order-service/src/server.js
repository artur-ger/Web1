const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const Datastore = require("nedb-promises");
const { v4: uuidv4 } = require("uuid");
const { requireAuth } = require("../../shared/jwtAuth");

const PORT = Number(process.env.PORT || 3002);
const DB_DIR = process.env.DB_DIR || path.join(__dirname, "..", "data");
const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:3001";

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

let cartsDb;
let cartItemsDb;
let ordersDb;
let orderItemsDb;

const allowedTransitions = {
  new: ["confirmed", "cancelled"],
  confirmed: ["paid", "cancelled"],
  paid: ["shipped", "cancelled"],
  shipped: ["completed"],
  completed: [],
  cancelled: []
};

async function initDb() {
  cartsDb = Datastore.create({
    filename: path.join(DB_DIR, "carts.db"),
    autoload: true
  });
  cartItemsDb = Datastore.create({
    filename: path.join(DB_DIR, "cart-items.db"),
    autoload: true
  });
  ordersDb = Datastore.create({
    filename: path.join(DB_DIR, "orders.db"),
    autoload: true
  });
  orderItemsDb = Datastore.create({
    filename: path.join(DB_DIR, "order-items.db"),
    autoload: true
  });

  await cartsDb.ensureIndex({ fieldName: "id", unique: true });
  await cartsDb.ensureIndex({ fieldName: "client_cart_key", unique: true });
  await cartItemsDb.ensureIndex({ fieldName: "id", unique: true });
  await cartItemsDb.ensureIndex({ fieldName: "cart_id" });
  await ordersDb.ensureIndex({ fieldName: "id", unique: true });
  await ordersDb.ensureIndex({ fieldName: "order_number", unique: true });
  await ordersDb.ensureIndex({ fieldName: "status" });
  await orderItemsDb.ensureIndex({ fieldName: "id", unique: true });
  await orderItemsDb.ensureIndex({ fieldName: "order_id" });
}

function badRequest(res, message) {
  return res.status(400).json({
    error: { code: "BAD_REQUEST", message }
  });
}

function getCartKey(req) {
  return req.header("X-Cart-Key") || req.query.cart_key || req.body?.cart_key || null;
}

async function getOrCreateCart(cartKey) {
  let cart = await cartsDb.findOne({ client_cart_key: cartKey });
  if (cart) return cart;

  const now = new Date().toISOString();
  const id = uuidv4();
  await cartsDb.insert({
    id,
    client_cart_key: cartKey,
    created_at: now,
    updated_at: now
  });
  cart = await cartsDb.findOne({ id });
  return cart;
}

async function fetchProduct(productId) {
  const url = `${CATALOG_BASE_URL}/api/v1/products/${productId}`;
  const response = await axios.get(url, { timeout: 4000 });
  return response.data;
}

async function readCartDetails(cartId) {
  const items = await cartItemsDb.find({ cart_id: cartId }).sort({ created_at: 1 });

  let totalAmount = 0;
  const mapped = items.map((item) => {
    const lineTotal = Number(item.unit_price_snapshot) * item.quantity;
    totalAmount += lineTotal;
    return {
      id: item.id,
      product_id: item.product_id,
      product_name_snapshot: item.product_name_snapshot,
      product_image_snapshot: item.product_image_snapshot,
      quantity: item.quantity,
      unit_price_snapshot: Number(item.unit_price_snapshot),
      line_total: Number(lineTotal.toFixed(2))
    };
  });

  return {
    items: mapped,
    total_amount: Number(totalAmount.toFixed(2))
  };
}

function formatOrder(order, items) {
  return {
    id: order.id,
    order_number: order.order_number,
    status: order.status,
    customer_name: order.customer_name,
    customer_phone: order.customer_phone,
    customer_email: order.customer_email,
    delivery_address: order.delivery_address,
    delivery_comment: order.delivery_comment,
    total_amount: Number(order.total_amount),
    cart_id: order.cart_id,
    created_at: order.created_at,
    updated_at: order.updated_at,
    items
  };
}

function generateOrderNumber() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const random = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  return `ORD-${year}-${random}`;
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "order-service" });
});

app.get("/api/v1/cart", async (req, res, next) => {
  try {
    const cartKey = getCartKey(req);
    if (!cartKey) return badRequest(res, "cart_key или X-Cart-Key обязателен");

    const cart = await getOrCreateCart(cartKey);
    const details = await readCartDetails(cart.id);
    res.json({
      id: cart.id,
      cart_key: cart.client_cart_key,
      ...details
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/cart/items", async (req, res, next) => {
  try {
    const cartKey = getCartKey(req);
    if (!cartKey) return badRequest(res, "cart_key или X-Cart-Key обязателен");

    const { product_id: productId, quantity } = req.body || {};
    if (!productId) return badRequest(res, "product_id обязателен");
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return badRequest(res, "quantity должен быть целым числом > 0");
    }

    let product;
    try {
      product = await fetchProduct(productId);
    } catch (error) {
      return res.status(404).json({
        error: { code: "PRODUCT_NOT_FOUND", message: "Товар не найден в catalog-service" }
      });
    }
    if (product.stock_qty < quantity) {
      return badRequest(res, "Недостаточно товара на складе");
    }

    const cart = await getOrCreateCart(cartKey);
    const existing = await cartItemsDb.findOne({ cart_id: cart.id, product_id: productId });

    const now = new Date().toISOString();
    if (existing) {
      const newQty = existing.quantity + quantity;
      if (newQty > product.stock_qty) {
        return badRequest(res, "Суммарное количество превышает доступный остаток");
      }

      await cartItemsDb.update(
        { id: existing.id },
        {
          $set: {
            quantity: newQty,
            unit_price_snapshot: Number(product.price),
            product_name_snapshot: product.name,
            product_image_snapshot: product.image_url || "",
            updated_at: now
          }
        }
      );
    } else {
      await cartItemsDb.insert({
        id: uuidv4(),
        cart_id: cart.id,
        product_id: productId,
        product_name_snapshot: product.name,
        product_image_snapshot: product.image_url || "",
        quantity,
        unit_price_snapshot: Number(product.price),
        created_at: now,
        updated_at: now
      });
    }

    await cartsDb.update({ id: cart.id }, { $set: { updated_at: now } });
    const details = await readCartDetails(cart.id);
    res.status(201).json({ id: cart.id, cart_key: cart.client_cart_key, ...details });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/v1/cart/items/:itemId", async (req, res, next) => {
  try {
    const cartKey = getCartKey(req);
    if (!cartKey) return badRequest(res, "cart_key или X-Cart-Key обязателен");

    const { quantity } = req.body || {};
    if (!Number.isInteger(quantity)) return badRequest(res, "quantity должен быть целым числом");

    const cart = await getOrCreateCart(cartKey);
    const item = await cartItemsDb.findOne({ id: req.params.itemId, cart_id: cart.id });
    if (!item) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Позиция корзины не найдена" }
      });
    }

    if (quantity <= 0) {
      await cartItemsDb.remove({ id: item.id }, {});
    } else {
      let product;
      try {
        product = await fetchProduct(item.product_id);
      } catch (error) {
        return res.status(404).json({
          error: { code: "PRODUCT_NOT_FOUND", message: "Товар не найден в catalog-service" }
        });
      }
      if (quantity > product.stock_qty) return badRequest(res, "Количество превышает остаток товара");

      await cartItemsDb.update(
        { id: item.id },
        {
          $set: {
            quantity,
            unit_price_snapshot: Number(product.price),
            product_name_snapshot: product.name,
            product_image_snapshot: product.image_url || "",
            updated_at: new Date().toISOString()
          }
        }
      );
    }

    await cartsDb.update({ id: cart.id }, { $set: { updated_at: new Date().toISOString() } });
    const details = await readCartDetails(cart.id);
    res.json({ id: cart.id, cart_key: cart.client_cart_key, ...details });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/v1/cart/items/:itemId", async (req, res, next) => {
  try {
    const cartKey = getCartKey(req);
    if (!cartKey) return badRequest(res, "cart_key или X-Cart-Key обязателен");

    const cart = await getOrCreateCart(cartKey);
    const item = await cartItemsDb.findOne({ id: req.params.itemId, cart_id: cart.id });
    if (!item) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Позиция корзины не найдена" }
      });
    }

    await cartItemsDb.remove({ id: item.id }, {});
    await cartsDb.update({ id: cart.id }, { $set: { updated_at: new Date().toISOString() } });
    const details = await readCartDetails(cart.id);
    res.json({ id: cart.id, cart_key: cart.client_cart_key, ...details });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/orders", async (req, res, next) => {
  try {
    const cartKey = getCartKey(req);
    if (!cartKey) return badRequest(res, "cart_key или X-Cart-Key обязателен");

    const {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      delivery_address: deliveryAddress,
      delivery_comment: deliveryComment
    } = req.body || {};

    if (!customerName || !customerPhone || !customerEmail || !deliveryAddress) {
      return badRequest(
        res,
        "Поля customer_name, customer_phone, customer_email, delivery_address обязательны"
      );
    }

    const cart = await getOrCreateCart(cartKey);
    const cartItems = await cartItemsDb.find({ cart_id: cart.id });
    if (!cartItems.length) return badRequest(res, "Нельзя оформить заказ из пустой корзины");

    const confirmedItems = [];
    for (const item of cartItems) {
      let product;
      try {
        product = await fetchProduct(item.product_id);
      } catch (error) {
        return res.status(404).json({
          error: {
            code: "PRODUCT_NOT_FOUND",
            message: `Товар ${item.product_id} не найден в catalog-service`
          }
        });
      }
      if (product.stock_qty < item.quantity) {
        return badRequest(res, `Недостаточно остатка для товара ${product.name}`);
      }
      confirmedItems.push({
        product_id: product.id,
        product_name_snapshot: product.name,
        quantity: item.quantity,
        unit_price: Number(product.price),
        line_total: Number((product.price * item.quantity).toFixed(2))
      });
    }

    const totalAmount = confirmedItems.reduce((sum, item) => sum + item.line_total, 0);
    const now = new Date().toISOString();
    const orderId = uuidv4();
    let orderNumber = generateOrderNumber();
    while (await ordersDb.findOne({ order_number: orderNumber })) {
      orderNumber = generateOrderNumber();
    }

    await ordersDb.insert({
      id: orderId,
      order_number: orderNumber,
      status: "new",
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      delivery_address: deliveryAddress,
      delivery_comment: deliveryComment || "",
      total_amount: Number(totalAmount.toFixed(2)),
      cart_id: cart.id,
      created_at: now,
      updated_at: now
    });

    for (const item of confirmedItems) {
      await orderItemsDb.insert({
        id: uuidv4(),
        order_id: orderId,
        product_id: item.product_id,
        product_name_snapshot: item.product_name_snapshot,
        quantity: item.quantity,
        unit_price: item.unit_price,
        line_total: item.line_total,
        created_at: now
      });
    }

    await cartItemsDb.remove({ cart_id: cart.id }, { multi: true });
    await cartsDb.update({ id: cart.id }, { $set: { updated_at: now } });

    const order = await ordersDb.findOne({ id: orderId });
    const orderItems = await orderItemsDb.find({ order_id: orderId });
    res.status(201).json(formatOrder(order, orderItems));
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/orders/:id", async (req, res, next) => {
  try {
    const order = await ordersDb.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Заказ не найден" }
      });
    }
    const items = await orderItemsDb.find({ order_id: order.id });
    res.json(formatOrder(order, items));
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/orders/by-number/:orderNumber", async (req, res, next) => {
  try {
    const order = await ordersDb.findOne({ order_number: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Заказ не найден" }
      });
    }
    const items = await orderItemsDb.find({ order_id: order.id });
    res.json(formatOrder(order, items));
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/admin/orders", requireAuth, async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.page_size || 20);
    const status = req.query.status ? String(req.query.status) : null;
    const offset = (page - 1) * pageSize;

    let whereSql = "";
    const params = [];
    if (status) {
      whereSql = "WHERE status = ?";
      params.push(status);
    }

    let rows = await ordersDb.find({}).sort({ created_at: -1 });
    if (status) rows = rows.filter((item) => item.status === status);
    const total = rows.length;
    rows = rows.slice(offset, offset + pageSize);

    res.json({
      items: rows.map((row) => ({ ...row, total_amount: Number(row.total_amount) })),
      total,
      page,
      page_size: pageSize
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/admin/orders/:id", requireAuth, async (req, res, next) => {
  try {
    const order = await ordersDb.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Заказ не найден" }
      });
    }
    const items = await orderItemsDb.find({ order_id: order.id });
    res.json(formatOrder(order, items));
  } catch (error) {
    next(error);
  }
});

app.patch("/api/v1/admin/orders/:id/status", requireAuth, async (req, res, next) => {
  try {
    const { status } = req.body || {};
    if (!status) return badRequest(res, "status обязателен");

    const order = await ordersDb.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Заказ не найден" }
      });
    }

    if (!Object.prototype.hasOwnProperty.call(allowedTransitions, status)) {
      return badRequest(res, "Недопустимый статус");
    }

    if (order.status === status) {
      return res.json({ ...order, total_amount: Number(order.total_amount) });
    }

    const availableTransitions = allowedTransitions[order.status] || [];
    if (!availableTransitions.includes(status)) {
      return badRequest(res, `Переход ${order.status} -> ${status} недопустим`);
    }

    const updatedAt = new Date().toISOString();
    await ordersDb.update({ id: order.id }, { $set: { status, updated_at: updatedAt } });
    const updated = await ordersDb.findOne({ id: order.id });
    res.json({ ...updated, total_amount: Number(updated.total_amount) });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (error.errorType === "uniqueViolated") return badRequest(res, "Нарушение уникальности данных");
  console.error(error);
  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Внутренняя ошибка сервера"
    }
  });
});

async function bootstrap() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Order service is running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start order-service:", error);
  process.exit(1);
});
