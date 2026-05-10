# Internet Store Frontend (DZ4)

React-приложение пользовательской части интернет-магазина для ДЗ4 с интеграцией backend-микросервисов.

Прототип в Figma Sites:  
https://www.figma.com/site/9m8dPinVptbgaKZwcNm8Em/wep-app?node-id=19-12915&t=2ZTJhAeXvxOiSGPb-1

## Технологии

- React + Vite
- React Router (пакет `react-router`)
- Redux Toolkit + React Redux
- HTTP-запросы через `fetch`

## Запуск локально

```bash
npm install
npm run dev
```

Для работы сценария корзины и заказа должны быть запущены backend-сервисы:

- `catalog-service` на `http://localhost:3001`
- `order-service` на `http://localhost:3002`

Если сервисы запущены на других адресах, задайте переменные окружения:

```bash
VITE_CATALOG_API_URL=http://localhost:3001/api/v1
VITE_ORDER_API_URL=http://localhost:3002/api/v1
```

Сборка:

```bash
npm run build
```

## Реализованные страницы и маршруты

- `P1_Catalog` — `/`
- `P2_Product` — `/product/:id`
- `P3_Cart` — `/cart`
- `P4_Checkout` — `/checkout`
- `P5_Confirmation` — `/confirmation/:orderNumber`

## Что реализовано для ДЗ4

- Реализована только пользовательская часть (без админ-панели)
- Подключена интеграция с микросервисом товаров (`catalog-service`)
- Подключена интеграция с микросервисом заказов (`order-service`)
- Используются `fetch`-запросы с обработкой ответов и ошибок
- Состояние товаров, корзины и заказов вынесено в Redux
- Добавлена адаптивность (включая мобильную ширину от 320px)

