import { computed } from 'vue'
import { useStore } from "vuex"
import fieldTypes from "@/api/fieldTypes"

export function useFieldType() {
  const $store = useStore()

  /**
   * Запросить все типы
   * @returns {Promise} Массив типов
   */
  const fetchFieldTypes = async () => {
    return await fieldTypes
      .readAll()
      .then(result => {
        $store.dispatch('setFieldTypes', result)

        return result
      })
  }

  const getFieldTypeById = (id) => {
    return computed(() => $store.getters.getFieldTypeById(id)).value
  }

  return {
    fetchFieldTypes,
    getFieldTypeById,
  }
}