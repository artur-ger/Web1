const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { requireAuth, handleLogin, handleMe } = require("../../shared/jwtAuth");

const PORT = Number(process.env.PORT || 3003);
const CATALOG_BASE = (process.env.CATALOG_BASE_URL || "http://localhost:3001").replace(/\/$/, "");
const ORDER_BASE = (process.env.ORDER_BASE_URL || "http://localhost:3002").replace(/\/$/, "");

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

function bearer(req) {
  return req.header("Authorization") || "";
}

async function forward(res, config) {
  try {
    const response = await axios({
      validateStatus: () => true,
      ...config
    });
    res.status(response.status);
    if (response.status === 204) {
      return res.end();
    }
    return res.json(response.data);
  } catch (error) {
    return res.status(502).json({
      error: {
        code: "BAD_GATEWAY",
        message: error.message || "Ошибка вызова внутреннего сервиса"
      }
    });
  }
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "admin-service" });
});

app.post("/api/v1/auth/login", handleLogin);

app.post("/api/v1/auth/logout", requireAuth, (req, res) => {
  res.json({ ok: true });
});

app.get("/api/v1/me", requireAuth, handleMe);
app.get("/api/v1/auth/me", requireAuth, handleMe);

app.get("/api/v1/categories", requireAuth, (req, res) => {
  forward(res, {
    method: "GET",
    url: `${CATALOG_BASE}/api/v1/categories`,
    headers: { Authorization: bearer(req) }
  });
});

app.get("/api/v1/products", requireAuth, (req, res) => {
  forward(res, {
    method: "GET",
    url: `${CATALOG_BASE}/api/v1/products`,
    params: req.query,
    headers: { Authorization: bearer(req) }
  });
});

app.get("/api/v1/products/:id", requireAuth, (req, res) => {
  forward(res, {
    method: "GET",
    url: `${CATALOG_BASE}/api/v1/products/${req.params.id}`,
    headers: { Authorization: bearer(req) }
  });
});

app.post("/api/v1/products", requireAuth, (req, res) => {
  forward(res, {
    method: "POST",
    url: `${CATALOG_BASE}/api/v1/products`,
    headers: {
      Authorization: bearer(req),
      "Content-Type": "application/json"
    },
    data: req.body
  });
});

app.put("/api/v1/products/:id", requireAuth, (req, res) => {
  forward(res, {
    method: "PUT",
    url: `${CATALOG_BASE}/api/v1/products/${req.params.id}`,
    headers: {
      Authorization: bearer(req),
      "Content-Type": "application/json"
    },
    data: req.body
  });
});

app.patch("/api/v1/products/:id/publish", requireAuth, (req, res) => {
  forward(res, {
    method: "PATCH",
    url: `${CATALOG_BASE}/api/v1/products/${req.params.id}/publish`,
    headers: {
      Authorization: bearer(req),
      "Content-Type": "application/json"
    },
    data: req.body
  });
});

app.delete("/api/v1/products/:id", requireAuth, (req, res) => {
  forward(res, {
    method: "DELETE",
    url: `${CATALOG_BASE}/api/v1/products/${req.params.id}`,
    headers: { Authorization: bearer(req) }
  });
});

app.get("/api/v1/orders", requireAuth, (req, res) => {
  forward(res, {
    method: "GET",
    url: `${ORDER_BASE}/api/v1/admin/orders`,
    params: req.query,
    headers: { Authorization: bearer(req) }
  });
});

app.get("/api/v1/orders/:id", requireAuth, (req, res) => {
  forward(res, {
    method: "GET",
    url: `${ORDER_BASE}/api/v1/admin/orders/${req.params.id}`,
    headers: { Authorization: bearer(req) }
  });
});

app.patch("/api/v1/orders/:id/status", requireAuth, (req, res) => {
  forward(res, {
    method: "PATCH",
    url: `${ORDER_BASE}/api/v1/admin/orders/${req.params.id}/status`,
    headers: {
      Authorization: bearer(req),
      "Content-Type": "application/json"
    },
    data: req.body
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Внутренняя ошибка admin-service" }
  });
});

app.listen(PORT, () => {
  console.log(`Admin service is running on http://localhost:${PORT}`);
});
