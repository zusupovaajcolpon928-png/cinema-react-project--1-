# Cinema — React + TMDB

## Установка

1. Установи Node.js, если он ещё не установлен.
2. Распакуй архив и открой папку проекта в VS Code.
3. В терминале выполни:

```bash
npm install
```

4. Создай в корне проекта файл `.env` и добавь свой TMDB Read Access Token:

```env
REACT_APP_TMDB_TOKEN=твой_токен
```

5. Запусти проект:

```bash
npm start
```

Открой http://localhost:3000

## Что реализовано

- Список фильмов Now Playing
- Поиск фильмов через TMDB
- Страница подробной информации о фильме
- React Router, useState, useEffect, fetch
- Адаптивная вёрстка

Важно: `.env` не загружай в GitHub. Для production используй защищённый серверный прокси, поскольку переменные React-приложения видны в браузере.
