import { deleteFromArray } from '@/utils/index.js' 

export default {
  state: {
    project: null,
    projects: []
  },
  getters: {
    getProject: ({ project }) => project || null,

    getProjects: ({ projects }) => projects || []
  },
  mutations: {
    SET_PROJECT(state, data) {
      state.project = data
    },
    SET_PROJECTS(state, data) {
      console.log('--- SET_PROJECTS mutation ---')
      state.projects = data
    },
    REMOVE_PROJECT(state, id) {
      state.project = null

      deleteFromArray(state.projects, 'id', id)
    },
    REMOVE_PROJECTS(state, id) {
      deleteFromArray(state.projects, 'id', id)
    }
  },
  actions: {
    setProject({ commit }, data) {
      commit('SET_PROJECT', data)
    },
    setProjects({ commit }, data) {
      commit('SET_PROJECTS', data)
    },
    clearProject({ commit }, id) {
      commit('REMOVE_PROJECT', id)
    },
    clearProjects({ commit }, id) {
      commit('REMOVE_PROJECTS', id)
    },
  }
}