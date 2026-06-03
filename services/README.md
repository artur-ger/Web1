# Backend: три микросервиса

| Сервис | Порт | Назначение |
|--------|------|------------|
| **catalog-service** | 3001 | Каталог товаров (публичные GET, защищённые мутации) |
| **order-service** | 3002 | Корзина, оформление заказов, admin-эндпоинты заказов |
| **admin-service** | 3003 | Вход администратора (JWT), прокси к catalog и order |

Данные — NeDB в `services/catalog-service/data/` и `services/order-service/data/`.

## Запуск

Из корня `Web1`:

```bash
npm install
npm run install:all
npm run dev
```

Health:

- `GET http://localhost:3001/health`
- `GET http://localhost:3002/health`
- `GET http://localhost:3003/health`

## Переменные окружения

| Сервис | Переменная | По умолчанию |
|--------|------------|--------------|
| admin-service | `CATALOG_BASE_URL` | `http://localhost:3001` |
| admin-service | `ORDER_BASE_URL` | `http://localhost:3002` |
| admin-service | `ADMIN_LOGIN`, `ADMIN_PASSWORD` | `admin` / `admin` |
| admin-service | `JWT_SECRET` | dev-секрет (см. `shared/jwtAuth.js`) |
| order-service | `CATALOG_BASE_URL` | `http://localhost:3001` |

## Админ API (admin-service)

- `POST /api/v1/auth/login` — JWT
- `GET /api/v1/me` — текущий пользователь
- `GET/POST/PUT/PATCH/DELETE /api/v1/products*` — прокси в catalog
- `GET/PATCH /api/v1/orders*` — прокси в order-service (`/admin/orders`)

Коллекции Postman — в `postman/`.
