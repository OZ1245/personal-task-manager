export default {
  state: {
    user: {
      authData: null,
      data: null
    }
  },
  getters: {
    getUserAuthData: ({ user }) => (
      user.authData || null
    ),
    getUserData: ({ user }) => (
      user.data || null
    )
  },
  mutations: {
    SET_AUTH_DATA(state, authData) {
      state.user.authData = authData
    },
    REMOVE_AUTH_DATA(state) {
      state.user.authData = null
    },
    SET_USER_DATA(state, data) {
      state.user.data = data
    },
    REMOVE_USER_DATA(state) {
      state.user.data = null
    }
  },
  actions: {
    setUserAuthData({ commit }, authData) {
      commit('SET_AUTH_DATA', authData)
    },
    clearAuthData({ commit }) {
      commit('REMOVE_AUTH_DATA')
    },
    setUserData({ commit }, data) {
      commit('SET_USER_DATA', data)
    },
    clearUserData({ commit }) {
      commit('REMOVE_USER_DATA')
    }
  },
}
