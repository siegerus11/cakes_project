# Cakes Project

Веб-приложение для кондитерской — каталог тортов и бенто-тортов с возможностью оформления заказа.

## Технологии

| Категория        | Стек                                 |
| ---------------- | ------------------------------------ |
| Фреймворк        | React 18, TypeScript 4.8             |
| Сборка           | Vite 3                               |
| State Management | Redux Toolkit                        |
| Роутинг          | React Router DOM 6                   |
| Стилизация       | SCSS + CSS Modules                   |
| Карты            | Leaflet, React Leaflet               |
| Тестирование     | Jest 29, Testing Library             |
| Линтинг          | ESLint (Airbnb), Stylelint, Prettier |
| CI               | GitHub Actions                       |

## Установка и запуск

```bash
# Клонирование
git clone https://github.com/Siegerus/cakes_project.git
cd cakes_project

# Установка зависимостей
npm install

# Запуск dev-сервера (localhost:3000)
npm run dev
```

## Скрипты

| Команда                  | Описание                    |
| ------------------------ | --------------------------- |
| `npm run dev`            | Dev-сервер (localhost:3000) |
| `npm run build`          | Сборка для продакшена       |
| `npm run serve`          | Превью продакшен-сборки     |
| `npm run lint:eslint`    | Проверка ESLint             |
| `npm run fix:eslint`     | Исправление ESLint          |
| `npm run lint:stylelint` | Проверка Stylelint          |
| `npm run fix:stylelint`  | Исправление Stylelint       |
| `npm run test`           | Запуск тестов               |
| `npm run format`         | Форматирование Prettier     |

## Структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── app/            # Корневой компонент
│   ├── ui/             # UI-компоненты (Button, Hamburger)
│   ├── header/         # Шапка сайта
│   ├── footer/         # Подвал сайта
│   ├── card/           # Карточка товара
│   ├── cards-list/     # Список карточек
│   ├── nav-menu/       # Навигационное меню
│   ├── loader/         # Индикатор загрузки
│   ├── page-skeleton/  # Скелетон страницы (fallback для lazy)
│   └── ...
├── pages/              # Страницы приложения
│   ├── main-page/
│   ├── catalog-page/
│   │   ├── no-found-cake/    # Секция "Не нашли свой торт?"
│   │   └── sort-list/        # Компонент сортировки
│   ├── cake-article-page/
│   │   ├── slider/           # Слайдер фотографий
│   │   └── order-form/       # Форма заказа
│   │       ├── adder/        # Кнопка добавления с ценой
│   │       ├── filling-part/ # Выбор начинки
│   │       ├── optional-part/# Дополнительные опции
│   │       └── weight-part/  # Выбор веса
│   ├── about-page/
│   │   ├── importance/       # Блок "Наши ценности"
│   │   └── reviews/          # Отзывы
│   ├── contacts-page/
│   │   └── phone-segment/    # Сегмент с телефоном
│   ├── delivery-page/
│   ├── shopping-cart-page/
│   │   └── cart-item/        # Элемент корзины
│   ├── order-registration-page/
│   │   └── form/             # Форма оформления заказа
│   ├── thanks-page/
│   └── not-found-page/
├── store/              # Redux store
│   ├── cake-offers-data/  # Данные о тортах
│   ├── cart-process/      # Состояние корзины
│   └── main-process/      # Основной процесс
├── hooks/              # Пользовательские хуки
├── types/              # TypeScript типы
├── utils/              # Утилитарные функции
├── mocks/              # Моковые данные
├── libs/               # Внешние библиотеки
├── constants.ts        # Константы приложения
└── global.module.scss  # Глобальные стили
```

**Примечание:** Вложенные папки внутри `pages/` содержат компоненты, которые используются только на соответствующей странице.

## Ленивая загрузка страниц

Большинство страниц загружаются лениво через `React.lazy` + `Suspense` — код каждой страницы попадает в отдельный чанк и загружается только при переходе на маршрут. Это уменьшает размер начального бандла.

Лениво загружаются:
- `AboutPage`
- `CakeArticlePage`
- `CatalogPage` (через `CatalogPageWrapper` для проброса пропсов)
- `ContactsPage`
- `DeliveryPage`
- `OrderRegistrationPage`
- `ShoppingCartPage`
- `ThanksPage`
- `NotFoundPage`

Страницы, которые загружаются сразу:
- `MainPage` — главная страница, нужна при старте

Fallback при загрузке — компонент `PageSkeleton` (`src/components/page-skeleton/page-skeleton.tsx`).

## Маршруты

| Путь                   | Страница               |
| ---------------------- | ---------------------- |
| `/`                    | Главная                |
| `/about`               | О нас                  |
| `/catalog`             | Каталог                |
| `/catalog/cakes`       | Каталог тортов         |
| `/catalog/bento-cakes` | Каталог бенто-тортов   |
| `/cake-offer/:id`      | Карточка торта         |
| `/contacts`            | Контакты               |
| `/delivery`            | Доставка и оплата      |
| `/shopping-cart`       | Корзина                |
| `/order-registration` | Оформление заказа |
| `/thanks-page` | Страница благодарности |
| `*` | Страница не найдена (catch-all) |

## Redux Store

| Namespace        | Назначение                                       |
| ---------------- | ------------------------------------------------ |
| `NameSpace.Data` | Данные о тортах (cake-offers-data)               |
| `NameSpace.Main` | Основной процесс (сортировка, цена конфигурации) |
| `NameSpace.Cart` | Состояние корзины                                |

## Ключевые типы

```typescript
type CakeOffer      // Объект торта с начинками, весом, дополнениями
type CakeOrder      // Объект заказа (хранится в корзине)
type Filling        // Начинка
type Optional       // Дополнительные опции
type CheckBoxValue  // { [key: string]: boolean }
type Radio          // { weightValue: number, isChecked: boolean }
```

## CI

При каждом пуше в `master`/`develop` и при PR в `master` автоматически запускаются:

-   ESLint
-   Stylelint
-   Тесты (Jest)
-   Сборка (Vite)

## Бизнес-логика подсчёта стоимости

### Формирование цены товара

Цена каждого торта рассчитывается из трёх компонентов:

```
цена = базовая_цена + надбавка_за_вес + начинки + дополнения
```

**Базовая цена** — `CakeOffer.price` из JSON.

**Надбавка за вес** — из `weightScale`:

| Вес | Множитель |
|-----|-----------|
| 1.5 кг | × 0 (без надбавки) |
| 3 кг | × 0.5 от базовой цены |
| 5 кг | × 1.5 от базовой цены |

**Начинки** (`filling`) — checkboxes. Каждая начинка имеет свою цену (`Filling.price`). Можно выбрать несколько.

**Дополнения** (`optional`) — checkboxes. Каждое дополнение имеет свою цену (`Optional.price`).

### Итоговая сумма корзины

```
итого = Σ(цена_товара × количество) для всех товаров
```

Рассчитывается селектором `selectFinalSum` в `store/cart-process/cart-process.ts`.

### Скидка (промокод)

При применении промокода (`getDiscountAction.fulfilled`):

- Каждый товар в корзине пересчитывается: `price = price × (1 - 0.15)`
- Скидка **15%** (значение `discountValue` в `constants.ts`)

### Форматирование

Отображение цен через `getFormattedPrice()` → `toLocaleString('ru-RU')`, например: `3 600 ₽`.
