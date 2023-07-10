# API и запросы

[<- Назад (Технические подробности)](./index.md)

<details> 
  <summary>Содержание</summary>
  <ul>
    <li>
      <a href=#settings>Настройки</a>
      <ul>
        <li>GetSettings
        <li>SetSettings
      </ul>
    </li>
    <li>
      <a href=#projects>Проекты</a>
      <ul>
        <li>CreateProject
        <li>GetProjects
      </ul>
    </li>
    <li>
      <a href=#tasks>Задачи</a>
      <ul>
        <li>-
      </ul>
    </li>
  </ul>
</details>

## Настройки <a name="settings" id="settings"></a>

### GET GetSettings

Получить настройки пользователя

Параметры:

1. **userId** [Integer] Id пользователя

Запрос:

```sql
SELECT settings FROM users WHERE id = $1
```

### POST SetSettings

Сохранить настройки пользователя

Параметры:

1. **userId** [Integer] Id пользователя
2. **settings** [JSON] Настройки

Запрос:

```sql
UPDATE users SET settings = $2 WHERE id = $1
```

## Проекты <a name=projects id="projects"></a>

<!-- TODO: -->

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

## Задачи <a name=tasks id="tasks"></a>

<!-- TODO: -->