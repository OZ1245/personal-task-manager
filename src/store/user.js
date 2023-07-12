export default {
  state: {
    user: {
      authData: null,
    }
  },
  getters: {
    getUserAuthData: ({ user }) => (
      user.authData || null
    ) 
  },
  mutations: {
    SET_AUTH_DATA(state, authData) {
      state.user.authData = authData
    },
    REMOVE_AUTH_DATA(state) {
      state.user.authData = null
    }
  },
  actions: {
    setUserAuthData({ commit }, authData) {
      commit('SET_AUTH_DATA', authData)
    },
    clearAuthData({ commit }) {
      commit('REMOVE_AUTH_DATA')
    }
  },
}
