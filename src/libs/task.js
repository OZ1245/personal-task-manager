import tasksApi from '@/api/tasks'
import { useUser } from './user'
import { computed } from 'vue'

export function useTask() {
  // const $store = useStore()
  const $user = useUser()

  const userId = computed(() => $user.getUser()).value.id

  const createTask = async (params) => {
    console.log('--- createTask lib method ---')
    console.log('params:', params)

    return await tasksApi
      .insertRow({
        created: params.created,
        data: params.data,
        project_id: params.projectId,
        user_id: userId
      })
      .then(result => {
        return result
      })
  }

  return {
    createTask
  }
}