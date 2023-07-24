import tasksApi from '@/api/tasks'
import { useUser } from './user'
import { computed } from 'vue'

export function useTask() {
  const $user = useUser()

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
      .readRowsByDate([date])
      .then(response => {
        return response
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
  }
}