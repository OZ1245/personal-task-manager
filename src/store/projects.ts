import { deleteFromArray } from '@/utils/index' 

interface IProjectState {
  project: any,
  projects: any[]
}

export default {
  state: {
    project: null,
    projects: []
  },
  getters: {
    getProject: ({ project }: any): any => project || null,

    getProjects: ({ projects }: any): any => projects || []
  },
  mutations: {
    SET_PROJECT(state: IProjectState, data: any) {
      state.project = data
    },
    SET_PROJECTS(state: IProjectState, data: any) {
      state.projects = data
    },
    REMOVE_PROJECT(state: IProjectState, id: string) {
      state.project = null

      deleteFromArray(state.projects, id, 'id')
    },
    REMOVE_PROJECTS(state: IProjectState, id: string) {
      deleteFromArray(state.projects, id, 'id')
    }
  },
  actions: {
    setProject({ commit }: any, data: any) {
      commit('SET_PROJECT', data)
    },
    setProjects({ commit }: any, data: any) {
      commit('SET_PROJECTS', data)
    },
    clearProject({ commit }: any, id: string) {
      commit('REMOVE_PROJECT', id)
    },
    clearProjects({ commit }: any, id: string) {
      commit('REMOVE_PROJECTS', id)
    },
  }
}