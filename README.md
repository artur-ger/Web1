# Интернет-магазин ламп

Финальный проект по дисциплине «Веб-разработка». Интернет-магазин с витриной для покупателей и панелью администратора. Backend построен на микросервисной архитектуре: три независимых сервиса и отдельный React-фронтенд.

Автор: см. `authors.txt`.

## Функциональность

### Покупатель (витрина)

- просмотр каталога товаров;
- карточка товара, добавление в корзину;
- корзина: изменение количества, итоговая сумма;
- оформление заказа и экран подтверждения с номером заказа.

### Менеджер (админ-панель)

- вход по логину и паролю (JWT);
- товары: список, создание, редактирование, удаление, публикация на витрине;
- заказы: список, карточка заказа, смена статуса;
- выход из системы.

## Архитектура

| Компонент | Порт | Назначение |
|-----------|------|------------|
| `catalog-service` | 3001 | Каталог: категории, товары, CRUD (мутации с JWT) |
| `order-service` | 3002 | Корзина, оформление заказов, admin-эндпоинты заказов |
| `admin-service` | 3003 | Авторизация администратора, прокси запросов админки |
| `site_figma` | 5173 | React-приложение: витрина и `/admin/*` |

Схема взаимодействия:

- витрина → `catalog-service` и `order-service`;
- админ-панель → только `admin-service`, далее прокси в catalog и order с тем же JWT.

Данные хранятся в NeDB (`services/catalog-service/data/`, `services/order-service/data/`).

## Требования

- Node.js 18+
- npm

## Установка и запуск

### Backend (все три сервиса)

Из корня репозитория:

```bash
npm install
npm run install:all
npm run dev
```

В консоли должны появиться сообщения о запуске на портах **3001**, **3002**, **3003**.

Проверка:

```text
http://localhost:3001/health
http://localhost:3002/health
http://localhost:3003/health
```

### Frontend

В отдельном терминале:

```bash
cd site_figma
npm install
npm run dev
```

Приложение: `http://localhost:5173`

Сборка production: `npm run build` (в каталоге `site_figma`).

### Админ-панель

| Параметр | Значение |
|----------|----------|
| URL | `http://localhost:5173/admin/login` |
| Логин | `admin` |
| Пароль | `admin` |

Учётные данные задаются переменными `ADMIN_LOGIN` и `ADMIN_PASSWORD` в `admin-service` (см. `services/README.md`).

## Структура репозитория

| Путь | Содержимое |
|------|------------|
| `services/catalog-service` | Микросервис товаров |
| `services/order-service` | Микросервис заказов |
| `services/admin-service` | Микросервис панели управления |
| `services/shared` | Общий модуль JWT |
| `site_figma` | Frontend (Vite, React, Redux Toolkit) |
| `postman` | Коллекции для проверки API |
| `TZ-Internet-magazin-lampy.md` | Техническое задание |
| `authors.txt` | ФИО автора |

Подробнее: `services/README.md` (backend), `site_figma/README.md` (frontend и маршруты).

## API и Postman

Коллекции в `postman/`:

- `catalog-service.postman_collection.json` — каталог;
- `order-service.postman_collection.json` — корзина и заказы;
- `admin-service.postman_collection.json` — вход и админские операции (`baseUrl`: `http://localhost:3003`).

Для админских запросов: сначала `POST /api/v1/auth/login`, токен — в переменную `accessToken`.

## Проверено перед сдачей

1. Запущены три backend-сервиса и frontend.
2. Витрина: каталог → корзина → оформление → номер заказа на экране подтверждения.
3. Админка: вход → изменение товара → просмотр заказа → смена статуса → выход.
4. В репозитории на GitHub актуальная версия, включая `services/admin-service`.

## Типичные проблемы

**Порт занят (`EADDRINUSE`)** — предыдущий процесс Node не завершён:

```bash
netstat -ano | findstr ":3001"
taskkill /PID <номер> /F
```

Аналогично для портов 3002 и 3003.

**Пустой каталог или корзина** — убедитесь, что backend запущен до старта frontend.

**401 в админке** — заново войдите через `/admin/login`; токен хранится в `localStorage` (`admin_access_token`).
