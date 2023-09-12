interface IUserState {
  authData: any,
  data: any
}

export default {
  state: {
    authData: null,
    userData: null
  },
  getters: {
    getUserAuthData: ({ user }: any): IUserState => (
      user.authData || null
    ),
  },
  mutations: {
    SET_AUTH_DATA(state: IUserState, authData: any) {
      state.authData = authData
    },
    REMOVE_AUTH_DATA(state: IUserState) {
      state.authData = null
    },
    SET_USER_DATA(state: IUserState, data: any) {
      state.data = data
    },
    REMOVE_USER_DATA(state: IUserState) {
      state.data = null
    }
  },
  actions: {
    setUserAuthData({ commit }: any, authData: any) {
      commit('SET_AUTH_DATA', authData)
    },
    clearAuthData({ commit }: any) {
      commit('REMOVE_AUTH_DATA')
    },
    setUserData({ commit }: any, data: any) {
      commit('SET_USER_DATA', data)
    },
    clearUserData({ commit }: any) {
      commit('REMOVE_USER_DATA')
    }
  },
}
