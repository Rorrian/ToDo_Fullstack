# Fullstack-проект ToDo-list

![Alt text](/git-images/image.png)

## Реализованы следующие механизмы:
- **Основной функционал работы с БД** - CRUD (create, read, update, delete)
- **Получение данных с сервера**
- **Обработка ошибок** CRUD
- **Работа со стейтом**
- **Визуальная часть**: главная страница и анимации, адаптивность

## Стек технологий:
- **Nest.js** + **PostgreSQL** + **React.js** + **TypeScript**
- **Node.js ORM-библиотека**: Sequelize для взаимодействия с PostgreSQL
- **State manager**: Redux + Redux Saga (middleware для redux)
- **Взаимодействие с сервером**: Axios
- **Пакетный менеджер**: Yarn
- **React Bootstrap**

---

## Полезные материалы:

### Backend:

- **Установка PostgreSQL**: [Скачать](https://www.postgresql.org/download/)

### Frontend:

- **React Bootstrap**: [Документация](https://react-bootstrap.netlify.app/docs/getting-started/introduction)

---

## Развертывание и запуск приложения

1. **Установить СУБД, создать БД и указать данные для подключения в файле `/server/.env`**

2. **Backend:**
```bash
  cd server/todo
  yarn install
  yarn start
```

3. **Frontend:**
```bash
  cd client/todo
  yarn install
  yarn start
```
