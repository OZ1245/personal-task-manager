import tasksApi from '@/api/tasks'
import { useUser } from './user'
import { computed } from 'vue'

export function useTask() {
  const $user = useUser()

  const userId = computed(() => $user.getUser()).value.id

  /**
   * Создать задачу
   * @param {Array} params Значение полей
   * @returns {Object} Данные задачи
   */
  const createTask = async (params) => {
    return await tasksApi
      .insertRow({
        created: params.created,
        data: params.data,
        project_id: params.projectId,
        user_id: userId
      })
      .then(response => {
        return response
      })
  }

  const fetchTasksByDate = async (date) => {
    return await tasksApi
      .readRowsByDate([date])
      .then(response => {
        return response
      })
  }

  return {
    createTask,
    fetchTasksByDate
  }
}