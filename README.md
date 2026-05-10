# Интернет-магазин ламп (учебный проект)

Один репозиторий: ТЗ, Postman-коллекции, два Node-сервиса и React-фронт в папке `site_figma`.

## Что где лежит

| Папка / файл | Содержимое |
|----------------|------------|
| `services/catalog-service` | API товаров и категорий, порт **3001** |
| `services/order-service` | API корзины и заказов, порт **3002** |
| `site_figma` | Витрина на React (Vite, Redux, fetch к сервисам выше) |
| `postman` | Коллекции для проверки API |
| `TZ-Internet-magazin-lampy.md` | Техническое задание |

Админ-панели в коде нет — только пользовательская часть магазина.

## Запуск backend

Из корня `Web1`:

```bash
npm install
npm run install:all
npm run dev
```

Должны стартовать **3001** и **3002**. Проверка: в браузере открыть `http://localhost:3001/health` и `http://localhost:3002/health`.

Если ругается `EADDRINUSE` — порты уже заняты старым процессом Node. Закрой предыдущий терминал с `npm run dev` или найди PID:

```bash
netstat -ano | findstr ":3001"
netstat -ano | findstr ":3002"
```

и заверши процесс: `taskkill /PID <номер> /F`.

На корневом адресе API (`http://localhost:3002/` без пути) Express может ответить `Cannot GET /` — это нормально, там не раздаётся HTML.

## Запуск frontend

Отдельное окно терминала:

```bash
cd site_figma
npm install
npm run dev
```

Адрес даст Vite (часто `http://localhost:5173`). Без запущенных **3001** и **3002** каталог и корзина работать не будут.

Подробности только по фронту — в `site_figma/README.md`.

