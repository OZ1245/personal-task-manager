# API <a name="top" id="top"></a>

[<- Назад (Технические подробности)](./index.md)

<details> 
  <summary>Содержание</summary>
  <ul>
    <li>
      <a href=#users>Пользователи</a>
      <ul>
        <li><a href="#user-signup">Регистрация</a>
        <li><a href="#user-signin">Вход в аккаунт</a>
        <li><a href="#user-signout">Выход из аккаунта</a>
        <li><a href="#user-get">Получить пользователя</a>
        <li><a href="#user-unactive">Отключение пользователя</a>
        <li><a href="#user-delete">Удалить пользователя</a>
      </ul>
    </li>
    <li>
      <a href=#settings>Настройки</a>
      <ul>
        <li>...
      </ul>
    </li>
    <li>
      <a href=#projects>Проекты</a>
      <ul>
        <li>...
      </ul>
    </li>
    <li>
      <a href=#tasks>Задачи</a>
      <ul>
        <li>...
      </ul>
    </li>
  </ul>
</details>

---

## Пользователи Users <a name="user" id="user"></a>

- **Таблица:** public.Users
- **Библиотека:** useUser() (`/src/libs/user.js`)
- **API:** `/src/api/user.js`

### **Регистрация** <a name="user-signup" id="user-signup"></a>

Добавить нового пользователя

- **Метод:** `create`
- **Параметры:**
  1. email [String] Email
  1. password [String] Пароль

### **Вход в аккаунт** <a name="user-signin" id="user-signin"></a>

Логин

- **Метод:** `login`
- **Параметры:**
  1. **email** (String) Email
  2. **password** (String) Пароль

### **Выход из аккаунта** <a name="user-signout" id="user-signout"></a>

Выход из аккаунта

- **Метод:** `logout`
- **Параметры:** нет

### **Получить пользователя** <a name="user-get" id="user-get"></a>

Получить авторизованного пользователя

- **Метод:** `getUser`
- **Параметры:** нет

### **Отключить пользователя** <a name="user-unactive" id="user-unactive"></a>

Отключить пользователя

- **Метод:** `unactive`
- **Параметры:**
  1. **id** (Integer) Id пользователя

### **Удалить пользователя** <a name="user-delete" id="user-delete"></a>

Удалить пользователя. В разработке.

- **Метод:** `deleteUser`
- **Параметры:**
  1. **id** (Integer) Id пользователя

---

<a href="#top">К содержанию</a>

---

## Настройки <a name="settings" id="settings"></a>

### GET GetUserSettings

Получить настройки пользователя

Параметры:

1. **userId** [Integer] Id пользователя

Запрос:

```sql
SELECT settings FROM users WHERE id = $1
```

### POST SaveUserSettings

Сохранить настройки пользователя

Параметры:

1. **userId** [Integer] Id пользователя
2. **settings** [JSON] Настройки

Запрос:

```sql
UPDATE users SET settings = $2 WHERE id = $1
```

### POST SaveTemplate

Созхранить шаблон настроек проекта.

Параметры:

1. **userId** [Integer] Id пользователя
1. **name** [String] Название шаблона
1. **settings** [JSON] Настройки шаблона

```sql
INSERT INTO templates (userId, name, settings) VALUES ($1, $2, $3) RETURNING id
```

### GET GetTemplates

Получить шаблоны настроек проекта.

Параметры:

1. **userId** [Integer] Id пользователя

```sql
SELECT * FROM templates WHERE id = $1
```

### POST DeleteTemplate

Удалить шаблон настроек проекта.

Параметры:

1. **templateId** [Integer] Id шаблона

```sql
DELETE FROM templates WHERE id = $1 
```

---

## Проекты <a name=projects id="projects"></a>

### POST CreateProject

Создать новый проект

Параметры:

1. **userId** [Integer] Id пользователя
2. **name** [Str] Название 
3. **settings** [JSON] Настройки проекта

Запрос:

```sql
INSERT INTO projects (userId, name, settings) VALUES ($1, $2, $3)
```

### GET GetProjects

Получить проекты пользователя

Параметры:

1. **userId** [Integer] Id пользователя

Запрос:

```sql
SELECT * FROM projects WHERE userId = $1
```

### GET GetProject

Получить проект

Параметры:

1. **projectId** [Integer] Id проекта

Запрос:

```sql
SELECT * FROM projects WHERE id = $1
```

### POST SaveProject

Редактировать проект

Параметры:

1. **projectId** [Integer] Id проекта
1. **name** [String] Название
1. **settings** [JSON] Настройки проекта

Запрос:

```sql
UPDATE projects SET name = $2, settings = $3 WHERE id = $1
```

### POST DeleteProject

Удалить проект

Параметры:

1. **projectId** [Integer] Id проекта

Запрос:

```sql
CREATE FUNCTION f_delete_project (projectId INTEGER) 
RETURNS BOOLEAN
AS $$
  DELETE FROM tasks WHERE projectId = $1;
  DELETE FROM projects WHERE id = $1;

  RETURN true;
$$

SELECT f_delete_project($1);
```

### GET GetFieldTypes

Получить типы полей.

Параметры: нет

Запрос:

```sql
SELECT * FROM fieldTypes
```

---

## Задачи <a name=tasks id="tasks"></a>

### POST CreateTask

Создать задачу.

Параметры:

1. **projectId** [Integer] Id проекта
1. **data** [JSON] Данные задачи

Запрос:

```sql
INSERT INTO tasks (projectId, data) VALUES ($1, $2) 
```

### POST UpdateTask

Редактировать задачу.

Параметры:

1. **projectId** [Integer] Id проекта
1. **data** [JSON] Данные задачи

Запрос:

```sql
UPDATE tasks SET data = $2 WHERE projectId = $1 
```

### GET GetTasks

Получить все задачи из проекта

Параметры:

1. **projectId** [Integer] Id проекта
1. **limit** [Integer] Отграничение вывода
1. **offset** [Integer] Сдвиг

Запрос:

```sql
SELECT * FROM tasks WHERE projectId = $1 ORDER BY created ASC LIMIT $2 OFFSET $3
```

### GET GetTasksByDate

Получить задачи за определенную дату.

Параметры:

1. **projectId** [Integer] Id проекта
1. **date** [TimestampZ] Дата

Запрос:

```sql
SELECT * FROM tasks WHERE projectId = $1 AND (modified < $2 AND modified > $2) ORDER BY modified
```

### GET GetTasksByPeriod

Получить задачи за период

Параметры:

1. **projectId** [Integer] Id проекта
1. **dateStart** [TimestampZ] Дата начала
1. **dateEnd** [TimestampZ] Дата конца

Запрос:

```sql
SELECT * FROM tasks WHERE projectId = $1 AND (modified < $2 AND modified > $3) ORDER BY modified
```