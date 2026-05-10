const express = require("express");
const cors = require("cors");
const path = require("path");
const Datastore = require("nedb-promises");
const { v4: uuidv4 } = require("uuid");

const PORT = Number(process.env.PORT || 3001);
const DB_DIR = process.env.DB_DIR || path.join(__dirname, "..", "data");

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

let categoriesDb;
let productsDb;

const categoriesSeed = [
  { id: "00000000-0000-0000-0000-000000000001", name: "Накаливание", slug: "incandescent", sort_order: 1 },
  { id: "00000000-0000-0000-0000-000000000002", name: "Светодиодные", slug: "led", sort_order: 2 },
  { id: "00000000-0000-0000-0000-000000000003", name: "Люминесцентные", slug: "fluorescent", sort_order: 3 },
  { id: "00000000-0000-0000-0000-000000000004", name: "Комплектующие", slug: "accessories", sort_order: 4 }
];

const productsSeed = [
  ["INC-A50-60-E27", "Лампа накаливания А50 60 Вт Е27", 65, 220, 1],
  ["INC-A60-75-E27", "Лампа накаливания А60 75 Вт Е27", 72, 180, 1],
  ["INC-CANDLE-40-E14", "Лампа накаливания свеча 40 Вт Е14", 59, 160, 1],
  ["LED-A60-10W-3000", "Светодиодная лампа A60 10 Вт 3000K Е27", 189, 140, 2],
  ["LED-A60-10W-4000", "Светодиодная лампа A60 10 Вт 4000K Е27", 189, 145, 2],
  ["LED-A60-12W-6500", "Светодиодная лампа A60 12 Вт 6500K Е27", 219, 120, 2],
  ["LED-C37-6W-3000", "Светодиодная лампа C37 свеча 6 Вт 3000K Е14", 165, 90, 2],
  ["LED-G45-8W-4000", "Светодиодная лампа G45 шар 8 Вт 4000K Е27", 175, 88, 2],
  ["LED-R63-10W-4000", "Светодиодная лампа R63 рефлектор 10 Вт 4000K Е27", 245, 70, 2],
  ["LED-PAR16-7W-GU10", "Светодиодная лампа PAR16 7 Вт 3000K GU10", 229, 76, 2],
  ["LED-T8-18W-4000", "Светодиодная лампа линейная T8 18 Вт 4000K G13", 330, 60, 2],
  ["FL-T8-18W-4000", "Лампа люминесцентная Т8 18 Вт 4000K G13", 210, 95, 3],
  ["FL-COMP-15W-E27", "Лампа люминесцентная компактная 15 Вт Е27", 240, 55, 3],
  ["LED-FIL-A60-8W-2700", "Светодиодная лампа filament A60 8 Вт 2700K Е27", 265, 66, 2],
  ["LED-FIL-G95-12W-2700", "Светодиодная лампа filament G95 12 Вт 2700K Е27", 389, 44, 2],
  ["LED-GROW-12W-E27", "Светодиодная лампа для растений 12 Вт Е27", 420, 38, 2],
  ["INC-BALL-40W-E14", "Лампа накаливания Б 40 Вт Е14 (шар)", 63, 130, 1],
  ["LED-MR16-5W-4000", "Светодиодная лампа MR16 5 Вт 4000K GU5.3", 175, 89, 2],
  ["LED-GX53-10W-4000", "Светодиодная лампа GX53 10 Вт 4000K", 220, 78, 2],
  ["ACC-SOCKET-E27", "Патрон Е27 с выключателем (комплектующее)", 320, 52, 4]
];

async function initDb() {
  categoriesDb = Datastore.create({
    filename: path.join(DB_DIR, "categories.db"),
    autoload: true
  });
  productsDb = Datastore.create({
    filename: path.join(DB_DIR, "products.db"),
    autoload: true
  });

  await categoriesDb.ensureIndex({ fieldName: "id", unique: true });
  await categoriesDb.ensureIndex({ fieldName: "slug", unique: true });
  await productsDb.ensureIndex({ fieldName: "id", unique: true });
  await productsDb.ensureIndex({ fieldName: "sku", unique: true });
  await productsDb.ensureIndex({ fieldName: "category_id" });
  await productsDb.ensureIndex({ fieldName: "is_published" });

  const categoriesCount = await categoriesDb.count({});
  if (!categoriesCount) await categoriesDb.insert(categoriesSeed);

  const productsCount = await productsDb.count({});
  if (!productsCount) {
    const now = new Date().toISOString();
    const docs = productsSeed.map(([sku, name, price, stockQty, categoryNumber]) => ({
      id: uuidv4(),
      category_id: `00000000-0000-0000-0000-00000000000${categoryNumber}`,
      sku,
      name,
      description: `Описание товара: ${name}`,
      price,
      stock_qty: stockQty,
      // Рабочие URL для демо (раньше был несуществующий cdn.example.com — картинки не грузились)
      image_url: `https://picsum.photos/seed/${encodeURIComponent(sku)}/480/480`,
      is_published: true,
      created_at: now,
      updated_at: now
    }));
    await productsDb.insert(docs);
  }
}

function mapProduct(row) {
  return {
    id: row.id,
    category_id: row.category_id,
    sku: row.sku,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    stock_qty: row.stock_qty,
    image_url: row.image_url,
    is_published: Boolean(row.is_published),
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

function badRequest(res, message) {
  return res.status(400).json({
    error: { code: "BAD_REQUEST", message }
  });
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "catalog-service" });
});

app.get("/api/v1/categories", async (req, res, next) => {
  try {
    const rows = await categoriesDb.find({}).sort({ sort_order: 1, name: 1 });
    res.json({ items: rows, total: rows.length });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/products", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.published_only === "true") query.is_published = true;
    if (req.query.category_id) query.category_id = req.query.category_id;
    let rows = await productsDb.find(query).sort({ created_at: -1 });
    if (req.query.search) {
      const search = String(req.query.search).toLowerCase();
      rows = rows.filter((item) => item.name.toLowerCase().includes(search));
    }

    res.json({
      items: rows.map(mapProduct),
      total: rows.length
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/products/:id", async (req, res, next) => {
  try {
    const row = await productsDb.findOne({ id: req.params.id });
    if (!row) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Товар не найден" }
      });
    }
    res.json(mapProduct(row));
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/products", async (req, res, next) => {
  try {
    const data = req.body || {};
    if (!data.category_id || !data.sku || !data.name) {
      return badRequest(res, "Поля category_id, sku, name обязательны");
    }
    if (Number(data.price) < 0 || Number(data.stock_qty) < 0) {
      return badRequest(res, "price и stock_qty должны быть неотрицательными");
    }

    const category = await categoriesDb.findOne({ id: data.category_id });
    if (!category) return badRequest(res, "Указанная категория не существует");

    const now = new Date().toISOString();
    const id = uuidv4();

    await productsDb.insert({
      id,
      category_id: data.category_id,
      sku: data.sku,
      name: data.name,
      description: data.description || "",
      price: Number(data.price || 0),
      stock_qty: Number(data.stock_qty || 0),
      image_url: data.image_url || "",
      is_published: data.is_published === false ? false : true,
      created_at: now,
      updated_at: now
    });

    const created = await productsDb.findOne({ id });
    res.status(201).json(mapProduct(created));
  } catch (error) {
    if (String(error.message).includes("UNIQUE")) {
      return badRequest(res, "sku должен быть уникальным");
    }
    next(error);
  }
});

app.put("/api/v1/products/:id", async (req, res, next) => {
  try {
    const existing = await productsDb.findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Товар не найден" }
      });
    }

    const data = req.body || {};
    const categoryId = data.category_id || existing.category_id;
    const category = await categoriesDb.findOne({ id: categoryId });
    if (!category) return badRequest(res, "Указанная категория не существует");

    const price = data.price === undefined ? Number(existing.price) : Number(data.price);
    const stockQty = data.stock_qty === undefined ? existing.stock_qty : Number(data.stock_qty);
    if (price < 0 || stockQty < 0) {
      return badRequest(res, "price и stock_qty должны быть неотрицательными");
    }

    const updatedAt = new Date().toISOString();
    const patch = {
      category_id: categoryId,
      sku: data.sku || existing.sku,
      name: data.name || existing.name,
      description: data.description === undefined ? existing.description : data.description,
      price,
      stock_qty: stockQty,
      image_url: data.image_url === undefined ? existing.image_url : data.image_url,
      is_published: data.is_published === undefined ? existing.is_published : Boolean(data.is_published),
      updated_at: updatedAt
    };
    await productsDb.update({ id: req.params.id }, { $set: patch });

    const updated = await productsDb.findOne({ id: req.params.id });
    res.json(mapProduct(updated));
  } catch (error) {
    if (String(error.message).includes("UNIQUE")) {
      return badRequest(res, "sku должен быть уникальным");
    }
    next(error);
  }
});

app.patch("/api/v1/products/:id/publish", async (req, res, next) => {
  try {
    const existing = await productsDb.findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Товар не найден" }
      });
    }

    if (typeof req.body?.is_published !== "boolean") {
      return badRequest(res, "is_published должен быть boolean");
    }

    await productsDb.update(
      { id: req.params.id },
      { $set: { is_published: req.body.is_published, updated_at: new Date().toISOString() } }
    );
    const updated = await productsDb.findOne({ id: req.params.id });
    res.json(mapProduct(updated));
  } catch (error) {
    next(error);
  }
});

app.delete("/api/v1/products/:id", async (req, res, next) => {
  try {
    const existing = await productsDb.findOne({ id: req.params.id });
    if (!existing) {
      return res.status(404).json({
        error: { code: "NOT_FOUND", message: "Товар не найден" }
      });
    }
    await productsDb.remove({ id: req.params.id }, {});
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (error.errorType === "uniqueViolated") {
    return badRequest(res, "sku должен быть уникальным");
  }
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
    console.log(`Catalog service is running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start catalog-service:", error);
  process.exit(1);
});
