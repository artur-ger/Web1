# Интернет-магазин ламп (учебный проект)

Проект ведется поэтапно в рамках домашних заданий:

- ДЗ1: техническое задание, прототипы, Postman
- ДЗ2: backend (микросервисы товаров и заказов)
- ДЗ3: frontend на React (пользовательская часть)

## Структура репозитория

- `services/` — backend-часть (catalog-service и order-service)
- `site_figma/` — frontend-часть (React + Vite, страницы магазина)
- `postman/` — коллекции запросов
- `TZ-Internet-magazin-lampy.md` — техническое задание

## Быстрый запуск backend (ДЗ2)

Из корня проекта:

```bash
npm install
npm run install:all
npm run dev
```

Сервисы поднимутся на:

- `http://localhost:3001` — catalog-service
- `http://localhost:3002` — order-service

Важно: это API-сервисы. В браузере по `/` может быть `Cannot GET /` — это нормально.

## Быстрый запуск frontend (ДЗ3)

Frontend запускается отдельно из папки `site_figma`:

```bash
cd site_figma
npm install
npm run dev
```

Открыть адрес из терминала Vite (обычно `http://localhost:5173`).

## Что реализовано в frontend (ДЗ3)

- Каталог: `/`
- Карточка товара: `/product/:id`
- Корзина: `/cart`
- Оформление заказа: `/checkout`
- Подтверждение: `/confirmation/:orderNumber`

Реализована только пользовательская часть (без админ-панели), используются mock-данные.

## Что сдавать по ДЗ3

Ссылка на публичный GitHub-репозиторий с этим проектом.  
Для проверки frontend преподавателю достаточно открыть папку `site_figma` и запустить команды из раздела выше.
