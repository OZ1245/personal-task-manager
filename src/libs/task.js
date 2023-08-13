import tasksApi from '@/api/tasks'
import { useUser } from './user'
import { computed } from 'vue'
import { useProject } from './project'
import { mapKeys } from 'lodash'
// import { useStore } from 'vuex'

export function useTask() {
  // const $store = useStore()
  const $user = useUser()
  const $project = useProject()

  const userId = computed(() => $user.getUser()).value.id

  /**
   * Создать задачу
   * @param {String} created Дата создания задачи в формате PostgreSQL timestampz
   * @param {Object} data Данные задачи
   * @param {Integer} projectId Id проекта
   * @returns {Promise} Данные задачи
   */
  const createTask = async ({ created, data, projectId }) => {
    return await tasksApi
      .insertRow({
        created: created,
        data: data,
        project_id: projectId,
        user_id: userId
      })
      .then(response => {
        return response
      })
  }

  /**
   * Поиск поставленных задач на определенную дату
   * @param {String} date Дата в PostgreSQL date. Формат: YYYY-MM-DD 
   * @returns {Promise} Результаты поиска
   */
  const fetchTasksByDate = async (date) => {
    const projectsFields = $project
      .getProject()
      .settings
      .fields

    return await tasksApi
      .readRowsByHistoryDate([date])
      .then(response => {
        return response
          .map(task => {
            return {
              ...task,
              data: task
                .data
                .reduce((result, item) => {
                  const projectField = projectsFields
                    .find(({ id }) => {
                      return id === item.id
                    })
                  
                  const field = {
                    ...projectField,
                    ...item,
                    _value: (projectField.nested_items.length)
                      ? projectField
                        .nested_items
                        .find(({ id }) => id === item.value)
                        .name
                      : item.value
                  }

                  return {
                    ...result,
                    [field.constant]: field
                  }
                }, {})
            }
          })
      })
  }

  /**
   * Получить незавершенные задачи
   * @returns {Promise} Список задач с подробными данными
   */
  const fetchUncompletedTasks = async () => {
    const projectsFields = $project
      .getProject()
      .settings
      .fields
    
    const field = projectsFields
      .find(field => field.name === 'Статус')
    
    const fieldId = field.id
    const fieldValue = field
      .nested_items
      .find(item => item.name === 'На продакшене')
      .id
    
    return await tasksApi
      .runRPC('get_uncompleted_tasks', {
        field_id: fieldId,
        field_value: fieldValue
      })
      .then(async response => {
        const keyMap = {
          id: 'id',
          created: 'created',
          modified: 'modified',
          history: 'history',
          data: 'data',
          project_id: 'project_id',
          user_id: 'user_id',
          value: 'result'
        }
        
        return response
          .map(item => {
            return mapKeys(item, (_, key) => {
              return keyMap[key]
            })
          })
          .map(task => {
            return {
              ...task,
              data: task
                .data
                .reduce((result, item) => {
                  const projectField = projectsFields
                    .find(({ id }) => {
                      return id === item.id
                    })
                  
                  const field = {
                    ...projectField,
                    ...item,
                    _value: (projectField.nested_items.length)
                      ? projectField
                        .nested_items
                        .find(({ id }) => id === item.value)
                        .name
                      : item.value
                  }

                  return {
                    ...result,
                    [field.constant]: field
                  }
                }, {})
            }
          })
        })
  } 

  /**
   * Добавить задачу в план
   * @param {Integer} id Id задачи 
   * @param {Array} history История добавления в план 
   * @returns {Promise} Результат добавления
   */
  const addTaskToPlan = async ({ id, history }) => {
    return await tasksApi
      .updateById({
        id,
        params: {
          history
        }
      })
      .then(response => {
        return response
      })
  }

  return {
    createTask,
    fetchTasksByDate,
    addTaskToPlan,
    fetchUncompletedTasks
  }
}