interface ICommonState {
  fieldTypes: any[]
}

export default {
  state: {
    fieldTypes: []
  },
  getters: {
    getFieldTypeById: ({ fieldTypes }: ICommonState) => (id: string) => fieldTypes
      .find(type => type.id === id),
    
    getFieldTypeByName: ({ fieldTypes }: ICommonState) => (name: string) => fieldTypes
      .find(type => type.name === name)
  },
  mutations: {
    SET_FIELD_TYPES(state: ICommonState, data: any) {
      state.fieldTypes = data
    }
  },
  actions: {
    setFieldTypes({ commit }: any, data: any) {
      commit('SET_FIELD_TYPES', data)
    }
  },
}
