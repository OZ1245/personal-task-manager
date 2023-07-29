export default {
  state: {
    fieldTypes: []
  },
  getters: {
    getFieldTypeById: ({ fieldTypes }) => (id) => fieldTypes
      .find(type => type.id === id),
    
    getFieldTypeByName: ({ fieldTypes }) => (name) => fieldTypes
      .find(type => type.name === name)
  },
  mutations: {
    SET_FIELD_TYPES(state, data) {
      state.fieldTypes = data
    }
  },
  actions: {
    setFieldTypes({ commit }, data) {
      commit('SET_FIELD_TYPES', data)
    }
  },
}
