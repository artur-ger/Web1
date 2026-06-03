# Интернет-магазин ламп

Финальный проект по дисциплине «Веб-разработка».

## Архитектура

| Компонент | Порт | Описание |
|-----------|------|----------|
| `catalog-service` | **3001** | Товары и категории |
| `order-service` | **3002** | Корзина и заказы |
| `admin-service` | **3003** | JWT и прокси для админки |
| `site_figma` | **5173** | React-фронт (витрина + `/admin/*`) |

- Витрина использует `catalog-service` и `order-service`
- Админка использует `admin-service`

## Быстрый старт

### 1. Backend (три сервиса)

```bash
npm install
npm run install:all
npm run dev
```

### 2. Frontend

```bash
cd site_figma
npm install
npm run dev
```

Приложение: `http://localhost:5173`

### Админ-панель

- URL: `http://localhost:5173/admin/login`
- Логин / пароль: **admin** / **admin**

## Содержимое репозитория

| Путь | Назначение |
|------|------------|
| `services/` | catalog, order, admin + `shared/jwtAuth.js` |
| `site_figma/` | React + Vite + Redux |
| `postman/` | Коллекции API |
| `TZ-Internet-magazin-lampy.md` | Техническое задание |
| `authors.txt` | Автор |

Подробнее по backend — `services/README.md`, по фронту — `site_figma/README.md`.

## Проверка

- `catalog-service`: `http://localhost:3001/health`
- `order-service`: `http://localhost:3002/health`
- `admin-service`: `http://localhost:3003/health`
- Админка: `http://localhost:5173/admin/login` (`admin` / `admin`)
