import { computed } from 'vue'
import { useStore } from 'vuex'

import { ITemplate } from '@/api/templates'
import projectsApi, { IProjectParams, IProject } from '@/api/projects'

import { useTemplate } from '@/libs/template'
import { useUser } from '@/libs/user'


interface ICreatedData {
  createdProject: IProject,
  createdTemplate?: ITemplate | any
}

export function useProject() {
  const $store = useStore()
  const $template = useTemplate()
  const $user = useUser()

  /**
   * Создать проект
   * @param {Object} data 
   * @returns {Promise} Данные проекта
   */
  const createProject = async (options: { 
    params: IProjectParams, 
    saveTemplateOption: boolean, 
    templateName: string
  }): Promise<ICreatedData | any> => {
      const { params, saveTemplateOption, templateName } = options

    return await $user
      .getUserData()
      .then(async user => {
        return await projectsApi
          .insertRow({
            ...params,
            user_id: user.id
          })
          .then(async (result: IProject) => {
            fetchProjects()

            const returnedData: ICreatedData = {
              createdProject: result,
              createdTemplate: null
            }

            if (saveTemplateOption) {
              await $template
                .createTemplate({
                  settings: params.settings,
                  user_id: user.id,
                  name: templateName 
                })
                .then(result => {
                  returnedData.createdTemplate = result
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
  const fetchProject = async (id: string): Promise<IProject> => {
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
  const fetchProjects = async (): Promise<IProject[]> => {
    return await $user
      .getUserData()
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
  const getProjects = (): Promise<IProject[]> => {
    return computed(() => $store.getters.getProjects).value
  }

  /**
   * Отправить обновленные данные проекта
   * @param {Object} data 
   * @returns {Promise} Обновленные данные
   */
  const updateProject = async (data: IProjectParams, id: string): Promise<IProject> => {
    return await $user
      .getUserData()
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
  const deleteProject = async (id: string): Promise<boolean> => {
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
  const deleteProjects = async (): Promise<boolean> => {
    return await $user
      .getUserData()
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