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
      <a href=#projects>Проекты</a>
      <ul>
        <li><a href="#projects-create">Создать проект</a>
        <li><a href="#projects-fetch-many">Запросить проекты</a>
        <li><a href="#projects-get-many">Получить проекты</a>
        <li><a href="#projects-fetch-one">Запросить проект</a>
        <li><a href="#projects-get-one">Получить проект</a>
        <li><a href="#projects-update">Обновить проект</a>
        <li><a href="#projects-delete-many">Удалить проекты</a>
        <li><a href="#projects-delete-one">Удалить проект</a>
      </ul>
    </li>
    <li>
      <a href=#tasks>Задачи</a>
      <ul>
        <li>TODO:
      </ul>
    </li>
    <li>
      <a href=#types>Типы полей</a>
      <ul>
        <li><a href="#types-fetch">Запросить поля</a>
      </ul>
    </li>
    <li>
      <a href=#types>Шаблоны</a>
      <ul>
        <li>TODO:
      </ul>
    </li>
    <li>
      <a href=#translations>Переводы</a>
      <ul>
        <li><a href="#translations-fetch">Запросить переводы</a>
      </ul>
    </li>
    <li>
      <a href=#rules>Правила заполнения</a>
      <ul>
        <li>TODO:
      </ul>
    </li>
  </ul>
</details>

---

## Пользователи Users <a name="user" id="user"></a>

- **Таблица:** public.Users
- **Библиотека:** useUser() (`/src/libs/user.js`)
- **API:** `/src/api/user.js`
- **Хранилище:** `/src/store/user.js`

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

## Проекты Projects <a name=projects id="projects"></a>

- **Таблица:** public.Project
- **Библиотека:** useProject() (`/src/libs/project.js`)
- **API:** `/src/api/projects.js`
- **Хранилище:** `/src/store/projects.js`

### **Создать проект** <a name="projects-create" id="projects-create"></a>

Создать новый проект пользователя

- **Метод:** `createProject`
- **Параметры:**
  1. **name** (String) Название
  1. **settings** (JSON) Настройки:
      - **fields** (Array) Массив настроек полей карточки:
        - **id** (String) Уникальный id поля в рамках настройки
        - **filed_id** (String) Уникальный id поля. FK из public.Fields
        - **editable** (Boolean) Редактируемое
        - **default_value** (String | Integer) Значение по-умолчанию
        - **multiply** (Boolean) Множественное
        - **rules** (JSON) Набор правил

### **Запросить проекты** <a name="projects-fetch-many" id="projects-fetch-many"></a>

Запросить проекты пользователя

- **Метод:** `fetchProjects`
- **Параметры:** нет

### **Получить проекты** <a name="projects-get-many" id="projects-get-many"></a>

Получить проекты пользователя

- **Метод:** `getProjects`
- **Параметры:** нет

### **Запросить проект** <a name="projects-fetch-one" id="projects-fetch-one"></a>

Запросить проект пользователя

- **Метод:** `fetchProject`
- **Параметры:**
  1. **id** (Integer) Id проекта

### **Получить проект** <a name="projects-get-one" id="projects-get-one"></a>

Получить проект пользователя

- **Метод:** `getProject`
- **Параметры:** нет

### **Обновить проект** <a name="projects-update" id="projects-update"></a>

Обновить проект

- **Метод:** `updateProject`
- **Параметры:**
  1. **id** (Integer) Id проекта
  1. **name** (String) Название
  1. **settings** (JSON) Настройки:
      - **fields** (Array) Массив настроек полей карточки:
        - **id** (String) Уникальный id поля в рамках настройки
        - **filed_id** (String) Уникальный id поля. FK из public.Fields
        - **editable** (Boolean) Редактируемое
        - **default_value** (String | Integer) Значение по-умолчанию
        - **multiply** (Boolean) Множественное
        - **rules** (JSON) Набор правил

### **Удалить проекты** <a name="projects-delete-many" id="projects-delete-many"></a>

Все проекты пользователя

- **Метод:** `Получить проекты пользователя`
- **Параметры:** нет

### **Удалить проект** <a name="projects-delete-one" id="projects-delete-one"></a>

Удалить проект

- **Метод:** `deleteProject`
- **Параметры:**
  1. **id** (Integer) id проекта

---

<a href="#top">К содержанию</a>

---

## Задачи <a name="tasks" id="tasks"></a>

TODO:

---

<a href="#top">К содержанию</a>

---

## Типы полей FieldsTypes <a name="types" id="types"></a>

- **Таблица:** public.FieldsTypes
- **Библиотека:** useFieldType() (`/src/libs/fieldType.js`)
- **API:** `/src/api/fieldTypes.js`
- **Хранилище:** не используется

### **Запросить поля** <a name="types-fetch" id="types-fetch"></a>

Запросить все типы полей

- **Метод:** `fetchFieldTypes`
- **Параметры:** нет

---

<a href="#top">К содержанию</a>

---

## Шаблоны Templates <a name="templates" id="templates"></a>

TODO:

---

<a href="#top">К содержанию</a>

---

## Переводы Translations <a name="translations" id="translations"></a>

- **Таблица:** public.Translations
- **Библиотека:** useTranslations() (`/src/libs/translations.js`)
- **API:** `/src/api/translations.js`
- **Хранилище:** не используется

### **Запросить переводы** <a name="translations-fetch" id="translations-fetch"></a>

Запросить все переводы на всех доступных языках

- **Метод:** `fetchTranslations`
- **Параметры:** нет

---

<a href="#top">К содержанию</a>

---

## TODO: Правила заполнения Rules <a name="rules" id="rules"></a>

---

<a href="#top">К содержанию</a>

---

