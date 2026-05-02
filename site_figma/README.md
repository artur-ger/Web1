# Internet Store Frontend (DZ3)

React-приложение пользовательской части интернет-магазина для ДЗ3.

Прототип в Figma Sites:  
https://www.figma.com/site/9m8dPinVptbgaKZwcNm8Em/wep-app?node-id=19-12915&t=2ZTJhAeXvxOiSGPb-1

## Технологии

- React + Vite
- React Router DOM (пакет `react-router`)
- Zustand (корзина)
- Mock-данные без backend

## Запуск локально

```bash
npm install
npm run dev
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

## Что важно для ДЗ3

- Реализована только пользовательская часть (без админ-панели)
- Настроена маршрутизация и переходы между всеми страницами сценария покупки
- Используются статические mock-данные
- Добавлена адаптивность (включая мобильную ширину от 320px)

