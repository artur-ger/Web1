# E-commerce web app (экспорт Figma Make)

Оригинальный макет и прототип в **Figma Sites**:

https://www.figma.com/site/9m8dPinVptbgaKZwcNm8Em/wep-app?node-id=19-12915&t=2ZTJhAeXvxOiSGPb-1 

## Запуск

```bash
npm install
# или
pnpm install

npm run dev
```

Откройте адрес из терминала (обычно `http://localhost:5173`).

## Маршруты (кратко)

| Экран | Путь |
|-------|------|
| P1 Каталог | `/` |
| P2 Товар | `/product/:id` |
| P3 Корзина | `/cart` |
| P4 Оформление | `/checkout` |
| P5 Подтверждение | `/confirmation/:orderNumber` |
| A1 Вход | `/admin`, `/admin/login` |
| A2 Товары | `/admin/products` |
| A3 Форма товара | `/admin/products/:id` |
| A4 Заказы | `/admin/orders` |
| A5 Заказ | `/admin/orders/:id` |

Подробнее см. `src/app/routes.ts`.
