import { computed } from 'vue'
import { useStore } from 'vuex'
import projectsApi from '@/api/projects'
import userApi from '@/api/user'

export function useProject() {
  const $store = useStore()

  /**
   * Создать проект
   * @param {Object} data 
   * @returns {Promise} Данные проекта
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
            fetchProjects()
            
            return result
          })
        })
  }

  /**
   * Запросить проект по id
   * @param {Integer} id 
   * @returns {Promise} Данные проекта
   */
  const fetchProject = async (id) => {
    return await projectsApi
      .readById(id)
      .then(result => {
        $store.dispatch('setProject', result)

        return result
      })
  }

  /**
   * Получить проект
   * @returns {Object} Объект проекта
   */
  const getProject = () => {
    return computed(() => $store.getters.getProject).value
  }

  /**
   * Запросить все проекты пользователя
   * @returns {Promise} Список проектов
   */
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

  /**
   * Получить все проекты пользователя
   * @returns {Array} Список проектов
   */
  const getProjects = () => {
    return computed(() => $store.getters.getProjects).value
  }

  /**
   * Отправить обновленные данные проекта
   * @param {Object} data 
   * @returns {Promise} Обновленные данные
   */
  const updateProject = async (data, id) => {
    return await userApi
      .retrieveUser()
      .then(async user => {
        return await projectsApi
          .updateById(
            {
              ...data,
              user_id: user.id
            },
            id
          )
          .then(result => {
            fetchProjects()
            $store.dispatch('setProject', result)

            return result
          })
      })
  }

  /**
   * Удалить проект
   * @param {Integer} id 
   * @returns {Promise} true
   */
  const deleteProject = async (id) => {
    return await projectsApi
      .deleteById(id)
      .then(result => {
        fetchProjects()
        $store.dispatch('clearProject', id)

        return result
      })
  }

  /**
   * Удалить все проекты пользователя
   * @returns {Promise} true
   */
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