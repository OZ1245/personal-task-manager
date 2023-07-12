import { computed } from 'vue'
import { useStore } from 'vuex'
import projectsApi from '@/api/projects'
import userApi from '@/api/user'

export function useProject() {
  const $store = useStore()

  /**
   * Создать проект
   * @param {*} data 
   * @returns 
   */
  const createProject = async (data) => {
    // TODO: Когда будет библиотека для работы с шаблонами
    // const template = (data.settings)
    //   ? data.settings
    //   : defaultTemplate
    
    return await userApi
      .retrieveUser()
      .then(async user => {
        return await projectsApi
          .insertRow({
            ...data,
            user_id: user.id
          })
          .then(result => {
            $store.dispatch('setProject', result)
            
            return result
          })
        })
  }

  const fetchProject = async (id) => {
    return await projectsApi
      .readById(id)
      .then(result => {
        $store.dispatch('setProject', result)

        return result
      })
  }

  const getProject = () => {
    return computed(() => $store.getters.getProject).value
  }

  const fetchProjects = async () => {
    return await userApi
      .retrieveUser()
      .then(async user => {
        return await projectsApi
          .readByUserId(user.id)
          .then(result => {
            $store.dispatch('setProjects', result)

            return result
          })
      })
  }

  const getProjects = () => {
    return computed(() => $store.getters.getProjects).value
  }

  const updateProject = async (data) => {
    return await projectsApi
      .updateById(data)
      .then(result => {
        $store.dispatch('setProject', result)

        return result
      })
  }

  const deleteProject = async (id) => {
    return await projectsApi
      .deleteById(id)
      .then(result => {
        $store.dispatch('clearProject', id)

        return result
      })
  }

  const deleteProjects = async () => {
    return await userApi
      .retrieveUser()
      .then(async user => {
        return await projectsApi
          .deleteByUserId(user.id)
          .then(result => {
            $store.dispatch('clearProjects', user.id)

            return result
          })
      })
  }

  return {
    createProject,
    fetchProject,
    fetchProjects,
    updateProject,
    deleteProject,
    deleteProjects,
    getProject,
    getProjects,
  }
}