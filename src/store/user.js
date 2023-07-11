export default {
  state: {
    user: {
      authData: {
        user: null,
        session: null
      },
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
    } 
  },
  actions: {
    setUserAuthData({ commit }, authData) {
      commit('SET_AUTH_DATA', authData)
    }
  },
}
