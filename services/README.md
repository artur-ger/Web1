# Микросервисы (ДЗ2)

## Сервисы

- `catalog-service` — товары/категории (`http://localhost:3001`)
- `order-service` — корзина/заказы (`http://localhost:3002`)

Оба сервиса хранят данные в файловой БД `nedb-promises` в папках `data/` каждого сервиса.

## Локальный запуск

### Вариант A: одной командой из корня проекта (рекомендуется)

```bash
cd c:\Web1
npm install
npm run install:all
npm run dev
```

Это поднимет оба сервиса:

- `http://localhost:3001` (`catalog-service`)
- `http://localhost:3002` (`order-service`)

Скрипты в корне настроены корректно (`npm run` показывает их).

### Вариант B: запуск сервисов отдельно

#### 1) Сервис товаров (catalog-service)

```bash
cd services/catalog-service
npm install
npm run dev
```

#### 2) Сервис заказов (order-service)

```bash
cd services/order-service
npm install
npm run dev
```

`order-service` читает данные о товарах из `catalog-service` по переменной:

- `CATALOG_BASE_URL` (по умолчанию `http://localhost:3001`)

## Проверка health

- `GET http://localhost:3001/health`
- `GET http://localhost:3002/health`

## Что показать в видео (ДЗ2)

### 1) Catalog-service (критерий «микросервис товаров»)

1. `GET /api/v1/categories`
2. `GET /api/v1/products?published_only=true`
3. `POST /api/v1/products` (создать тестовый товар)
4. `PUT /api/v1/products/:id` (обновить)
5. `PATCH /api/v1/products/:id/publish`
6. `GET /api/v1/products/:id` (проверка)
7. `DELETE /api/v1/products/:id`

### 2) Order-service (критерий «микросервис заказов»)

1. `GET /api/v1/cart` с `X-Cart-Key`
2. `POST /api/v1/cart/items` (добавить товар из каталога)
3. `PATCH /api/v1/cart/items/:itemId` (изменить количество)
4. `GET /api/v1/cart` (проверить сумму)
5. `POST /api/v1/orders` (оформить заказ)
6. `GET /api/v1/orders/:id`
7. `GET /api/v1/orders/by-number/:orderNumber`
8. `GET /api/v1/admin/orders`
9. `PATCH /api/v1/admin/orders/:id/status` со статусом `confirmed`
10. `PATCH /api/v1/admin/orders/:id/status` со статусом `paid`

### 3) Негативные проверки

1. `POST /api/v1/orders` с пустой корзиной -> `400`
2. `PATCH /api/v1/admin/orders/:id/status` с недопустимым переходом (например `completed` из `confirmed`) -> `400`

## Что говорить в видео (краткий скрипт)

1. «Это реализация backend для ДЗ2 по ТЗ из ДЗ1. Реализованы два сервиса: catalog-service и order-service».
2. «Оба сервиса запущены локально на портах 3001 и 3002».
3. «Показываю endpoint-ы товаров и полный CRUD для product».
4. «Показываю сценарий корзины и заказа: добавление, изменение количества, оформление, чтение по ID и номеру».
5. «Показываю админские операции по заказам: список и смена статусов».
6. «Показываю негативные проверки: заказ из пустой корзины и недопустимый переход статуса — в обоих случаях 400».
7. «Auth и отдельный admin-service на этом этапе не реализованы по условиям ДЗ2».
