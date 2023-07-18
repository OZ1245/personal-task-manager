import { computed } from 'vue'
import { useStore } from 'vuex'
import { useTemplate } from '@/libs/template.js'
import projectsApi from '@/api/projects'
import userApi from '@/api/user'

export function useProject() {
  const $store = useStore()
  const $template = useTemplate()

  /**
   * Создать проект
   * @param {Object} data 
   * @returns {Promise} Данные проекта
   */
  const createProject = async ({ params, saveTemplateOption, templateName }) => {
    console.log('--- createProject lib method ---')
    console.log('params:', params)
    return await userApi
      .retrieveUser()
      .then(async user => {
        return await projectsApi
          .insertRow({
            ...params,
            user_id: user.id
          })
          .then(async result => {
            fetchProjects()

            const returnedData = {
              createProject: result,
              createTemplate: null
            }

            if (saveTemplateOption) {
              await $template
                .createTemplate({
                  settings: params.settings,
                  user_id: user.id,
                  name: templateName 
                })
                .then(result => {
                  returnedData.createTemplate = result
                })
            }
            
            return returnedData
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