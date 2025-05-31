# VK-CRM MVP

Простое одностраничное приложение (MVP) для управления записями сотрудников (CRM), реализованное на основе React и TypeScript.

## Ключевые возможности

- Просмотр списка сотрудников с бесконечной прокруткой (infinite scroll).
- Добавление новой записи сотрудника через модальное окно.
- Редактирование существующей записи через модальное окно.
- Удаление записи сотрудника.
- Валидация форм на клиенте с помощью Zod и react-hook-form.
- Глобальное состояние управления записями через zustand.
- Простая JSON-Server API для эмуляции бэкенда.

## Технологии

- **React** + **TypeScript**
- **Zustand** для управления состоянием
- **react-hook-form** + **Zod** для валидации форм
- **axios** для HTTP-запросов
- **json-server** для мокового REST API
- **Jest** и **React Testing Library** для модульных тестов

## Структура проекта

```
36-VK-CRM
├─ db.json                   # Начальные данные для json-server
├─ package.json              # Скрипты и зависимости
├─ public                    # Статические файлы
├─ README.md                 # Текущий файл
├─ src                       # Исходный код приложения
│  ├─ api                    # Функции API (axios)
│  ├─ components             # React-компоненты
│  │  ├─ DataTable           # Таблица данных и вспомогательные компоненты
│  │  ├─ RecordForm          # Форма создания записи
│  │  ├─ EditRecordForm      # Форма редактирования записи
│  │  └─ UI                  # Повторно используемые UI-элементы (Modal, Button, FormInput и т.д.)
│  ├─ config                 # Конфигурация полей формы
│  ├─ hooks                  # Кастомные хуки (useInfiniteScroll)
│  ├─ store                  # Zustand store для управления записями
│  ├─ styles                 # CSS/SCSS модули для компонентов
│  └─ utils                  # Утилиты для валидации (Zod-схемы)
└─ tsconfig.json             # Конфигурация TypeScript
```

## Установка и запуск

1. Клонировать репозиторий и перейти в папку проекта:

   ```bash
   git clone <URL>
   cd 36-VK-CRM
   ```

2. Установить зависимости:

   ```bash
   npm install
   ```

3. Запустить моковый сервер JSON-Server на порту 3001:

   ```bash
   npm run server
   ```

4. В отдельной консоли запустить React-приложение:

   ```bash
   npm start
   ```

5. Открыть в браузере:

   ```
   http://localhost:3000
   ```

## Скрипты

- `npm start` — запуск фронтенд-сервера (react-scripts).
- `npm run server` — запуск JSON-Server для API (db.json).
- `npm run build` — сборка production-версии.
- `npm test` — запуск тестов.
- `npm run eject` — извлечение конфигурации create-react-app.

## API

- **GET** `/records?_start=<offset>&_limit=<limit>` — получить список записей с пагинацией.
- **POST** `/records` — добавить новую запись (без `id`, генерируется сервером).
- **PATCH** `/records/:id` — обновить запись по `id`.
- **DELETE** `/records/:id` — удалить запись.

## Тестирование

- Используются Jest и React Testing Library.
- Покрытие тестами компонентов RecordForm, бесконечной прокрутки и обработки ошибок.

Запуск тестов:

```bash
npm test
```
