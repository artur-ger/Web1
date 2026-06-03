# Frontend (витрина + админка)

React + Vite, Redux Toolkit.

- **Витрина** — `fetch` к `localhost:3001` (каталог) и `3002` (корзина/заказы).
- **Админка** (`/admin/*`) — `fetch` только к **admin-service** на `localhost:3003`.

## Запуск

Сначала backend из корня `Web1`:

```bash
npm run install:all
npm run dev
```

Должны работать порты **3001**, **3002**, **3003**.

Затем фронт:

```bash
npm install
npm run dev
```

Сборка: `npm run build`.

## Переменные окружения (опционально)

Файл `.env` в этой папке:

```
VITE_CATALOG_API_URL=http://localhost:3001/api/v1
VITE_ORDER_API_URL=http://localhost:3002/api/v1
VITE_ADMIN_API_URL=http://localhost:3003/api/v1
```

## Маршруты

| Раздел | URL |
|--------|-----|
| Каталог | `/` |
| Товар | `/product/:id` |
| Корзина | `/cart` |
| Оформление | `/checkout` |
| Подтверждение | `/confirmation/:orderNumber` |
| Вход админа | `/admin/login` |
| Товары (админ) | `/admin/products` |
| Форма товара | `/admin/products/:id` или `/new` |
| Заказы (админ) | `/admin/orders` |
| Заказ (админ) | `/admin/orders/:id` |

Админ: **admin** / **admin**.
