import tasksApi from '@/api/tasks'
import { useUser } from './user'
import { computed } from 'vue'
import { useProject } from './project'
import { mapKeys } from 'lodash'
import { useFieldType } from './fieldType'

export function useTask() {
  const $user = useUser()
  const $project = useProject()
  const $fieldType = useFieldType()

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
    return await tasksApi
      .readRowsByHistoryDate([date])
      .then(response => response)
  }

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
        return await $fieldType
          .fetchFieldTypes()
          .then(() => {

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
              .map(item => {
                return {
                  ...item,
                  data: item.data
                    .reduce((result, _item) => {
                      
                      const fieldData = projectsFields
                      .find(field => field.id === _item.id)
                      
                      const fieldTypeData = $fieldType.getFieldTypeById(fieldData.field_type_id)
                      
                      // console.log('_item:', _item)
                      // console.log('fieldData:', fieldData)
                      // console.log('fieldTypeData:', fieldTypeData)

                      let value = null

                      if (fieldTypeData.code === 'INPUT_TEXT') {
                        value = _item.value
                      }

                      if (fieldTypeData.code === 'SELECT_SIMPLE') {
                        value = fieldData
                          .nested_items
                          .find(item => item.id === _item.value)
                          .name
                      }
                      
                      return [
                        ...result,
                        {
                          name: fieldData.name,
                          value: value
                        }
                      ]
                    }, [])
                }
            })
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