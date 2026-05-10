# Frontend (витрина магазина)

React + Vite. Маршруты: каталог, карточка товара, корзина, оформление, экран с номером заказа. Данные товаров и корзины приходят с локальных сервисов через `fetch`; состояние — Redux Toolkit (`src/app/store`). Картинки в карточках — SVG из `src/app/data/productIcons.ts`, подбираются по SKU из каталога.

Прототип в Figma Sites:  
https://www.figma.com/site/9m8dPinVptbgaKZwcNm8Em/wep-app?node-id=19-12915&t=2ZTJhAeXvxOiSGPb-1

## Что нужно перед `npm run dev`

Сначала поднять backend из корня репозитория (`Web1`):

```bash
npm run install:all
npm run dev
```

Должны слушать **localhost:3001** (каталог) и **localhost:3002** (заказы).

Потом уже здесь:

```bash
npm install
npm run dev
```

Сборка продакшена:

```bash
npm run build
```

## Если API не на localhost или другие порты

По умолчанию в коде зашиты `http://localhost:3001/api/v1` и `http://localhost:3002/api/v1`. Чтобы переопределить, создай файл `.env` в этой папке:

```
VITE_CATALOG_API_URL=http://localhost:3001/api/v1
VITE_ORDER_API_URL=http://localhost:3002/api/v1
```

## Маршруты

| Страница | Адрес |
|----------|--------|
| Каталог | `/` |
| Товар | `/product/:id` |
| Корзина | `/cart` |
| Оформление | `/checkout` |
| Подтверждение | `/confirmation/:orderNumber` |

Проверить, что заказ реально создался на сервере:  
`http://localhost:3002/api/v1/orders/by-number/<номер с экрана подтверждения>`
