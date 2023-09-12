import { createStore } from 'vuex'
import user from './users'
import projects from './projects'
import common from './common'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    projects,
    common,
  }
})
