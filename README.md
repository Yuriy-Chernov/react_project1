# my-app

Небольшой e-commerce фронтенд на React: каталог товаров, корзина, избранное и авторизация. Данные берутся из [DummyJSON](https://dummyjson.com/).

## Демо

[https://react-project1-rosy.vercel.app/](https://react-project1-rosy.vercel.app/)

## Стек

- React 19 + TypeScript
- Redux Toolkit + RTK Query
- React Router
- Webpack
- CSS Modules

## Что умеет приложение

- Логин с защитой приватных роутов (`ProtectedRoute`)
- Каталог и поиск товаров, фильтр по тегам
- Страница товара
- Корзина (количество, итог, «заказ») и wishlist
- Сохранение корзины, wishlist и сессии в `localStorage`

## Структура `src`

```
src/
  app/         # store, router, App
  common/      # Header, Footer, ProtectedRoute
  features/    # auth, products, cart, wishlist, catalog
  shared/      # baseApi, localStorage helpers
  styles/      # переменные и reset
```

Фичи живут по папкам: UI и логика рядом, общее — в `common/` и `shared/`.

## Запуск

```bash
npm install
npm start
```

Сборка: `npm run build`  
Проверки: `npm run typecheck`, `npm run lint`

Демо-логин DummyJSON (уже подставлен на форме): `emilys` / `emilyspass`

Опционально: `API_BASE_URL` (по умолчанию `https://dummyjson.com/`).
