# Таблицы

[<- Назад (Технические подробности)](./index.md)

<details> 
  <summary>Содержание</summary>
  <ul>
    <li><a href=#users>Пользователи</a>
    <li><a href=#projects>Проекты</a>
    <li><a href=#tasks>Задачи</a>
    <li><a href=#fields>Типы полей</a>
    <li><a href=#templates>TODO: Шаблоны</a>
    <li><a href=#rules>Правила</a>
    <li><a href=#translations>Переводы</a>
  </ul>
</details>

---

> <br>
>
> **Примечания:**
> <br>
> 
> 1. В таблицах указанные типы из PostgreSQL. В JSON-объектах типы из JS.
> 2. В полях названий и описаний содержится константа фразы для переводов. За исключением тех полей названий и описаний, которые заполняет сам пользователь.
>
> <br>

## Users. Пользователи <a name="users" id="users"></a>

| Название   | Тип        | Значение по-умолчанию | Описание                 |
|------------|------------|-----------------------|--------------------------|
| id (PK)    | uuid       | NULL                  | -                        |
| created    | timestampz | now()                 | Дата регистрации         |
| last_login | timestampz | now()                 | Последний вход в систему |
| email      | text       | NULL                  | Email                    |
| active     | boolean    | true                  | Пользователь активен     |
| settings   | jsonb      | NULL                  | Настройки пользователя   |

**settings {Object}:**

- **name** {String} Отображаемое имя
- **language** {String} Язык

## Projects. Проекты <a name="projects" id="projects"></a>

| Название     | Тип        | Значение по-умолчанию | Описание               |
|--------------|------------|-----------------------|------------------------|
| id (PK)      | int8       | NULL                  | -                      |
| created      | timestampz | now()                 | Дата создания          |
| name         | varchar    | NULL                  | Название               |
| user_id (FK) | uuid       | NULL                  | Владелец -> `Users.id` |
| settings     | jsonb      | NULL                  | Настройки проекта      |

**settings {Object}:**

- **fields** {Array}:
  - **id** {String} Уникальный id. Формируется из временной метки создания
  - **filed_type** {String} Id типа поля. Внешний ключ на `FieldTypes.id`
  - **name** {String} Название поля
  - **editable** {Boolean} Редактируемое
  - **multiply** {Boolean} Множественное
  - **default_value** {String} Значение по-умолчанию
  - **rules** {Array} Набор правил. Внешние ключи на `Rules.id`

## Tasks. Задачи <a name="tasks" id="tasks"></a>

Карточки задач

| Название        | Тип        | Значение по-умолчанию | Описание                    |
|-----------------|------------|-----------------------|-----------------------------|
| id (PK)         | uuid       | NULL                  | -                           |
| project_id (FK) | int8       | NULL                  | Id проекта -> `Projects.id` |
| created         | timestampz | now()                 | Дата создания               |
| modified        | timestampz | NULL                  | Дата изменения              |
| data            | jsonb      | NULL                  | Данные карточки             |

**data {Array}:**

- **field_id** {String} Id поля. Внешний ключ на `Projects.settings.fields.id`
- **value** {*} Значение
- **created** {String} Временная метка создания
- **modified** {String} Временная метка последнего изменения

## FieldsTypes. Типы полей <a name="fields" id="fields"></a>

Предлагаемые типы полей для карточки задачи при настройке проекта.

| Название    | Тип  | Значение по-умолчанию | Описание              |
|-------------|------|-----------------------|-----------------------|
| id (PK)     | int8 | NULL                  | -                     |
| name        | text | NULL                  | Название поля         |
| description | text | NULL                  | Описание поля         |
| code        | text | NULL                  | Код поля для фронтенд |

## TODO: Templates. Шаблоны <a name="templates" id="templates"></a>

| Название | Тип     | Значение по-умолчанию | Описание                   |
|----------|---------|-----------------------|----------------------------|
| id       | int8    | NULL                  | -                          |
| name     | varchar | NULL                  | Название                   |
| userId   | FK      | -1                    | Владелец.                  |
|          |         |                       | Если значение -1,          |
|          |         |                       | то это предлагаемый шаблон |
| settings | jsonb   | NULL                  | Набор настроек             |

## Rules. Правила

| Название    | Тип  | Значение по-умолчанию | Описание                      |
|-------------|------|-----------------------|-------------------------------|
| id (PK)     | uuid | NULL                  | -                             |
| name        | text | NULL                  | Название                      |
| description | text | NULL                  | Описание                      |
| rule        | text | NULL                  | Правило. Регулярное выражение |

## Translations. Переводы <a name="translations" id="translations"></a>

Константы фраз и их переводы. Пока поддерживается только русский и английский.

| Название | Тип        | Значение по-умолчанию | Описание              |
|----------|------------|-----------------------|-----------------------|
| id (PK)  | uuid       | NULL                  | -                     |
| created  | timestampz | now()                 | Дата создания         |
| modified | timestampz | NULL                  | Дата изменения        |
| constant | text       | NULL                  | Константа фразы       |
| lang:en  | text       | NULL                  | Перевод на английский |
| lang:ru  | text       | NULL                  | Перевод на русский    |
