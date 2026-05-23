const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "lumen-dev-jwt-secret-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "8h";

const ADMIN_LOGIN = process.env.ADMIN_LOGIN || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

function signAdminToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function requireAuth(req, res, next) {
  const header = req.header("Authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return res.status(401).json({
      error: { code: "UNAUTHORIZED", message: "Требуется заголовок Authorization: Bearer <token>" }
    });
  }

  try {
    const decoded = jwt.verify(match[1], JWT_SECRET);
    req.admin = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: { code: "UNAUTHORIZED", message: "Недействительный или просроченный токен" }
    });
  }
}

function handleLogin(req, res) {
  const { login, password } = req.body || {};
  if (!login || !password) {
    return res.status(400).json({
      error: { code: "BAD_REQUEST", message: "Поля login и password обязательны" }
    });
  }

  if (login !== ADMIN_LOGIN || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      error: { code: "UNAUTHORIZED", message: "Неверный логин или пароль" }
    });
  }

  const token = signAdminToken({ sub: "admin", login: ADMIN_LOGIN, role: "admin" });
  return res.json({
    access_token: token,
    token_type: "Bearer",
    expires_in: JWT_EXPIRES_IN,
    user: { login: ADMIN_LOGIN, full_name: "Администратор" }
  });
}

function handleMe(req, res) {
  return res.json({
    login: req.admin.login,
    role: req.admin.role,
    full_name: "Администратор"
  });
}

module.exports = {
  requireAuth,
  handleLogin,
  handleMe,
  signAdminToken,
  JWT_SECRET
};
