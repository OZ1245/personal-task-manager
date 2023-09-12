import { computed } from 'vue'
import { useStore } from "vuex"
import fieldTypes, { ITypes } from "@/api/fieldTypes"

export function useFieldType() {
  const $store = useStore()

  /**
   * Запросить все типы
   * @returns {Promise} Массив типов
   */
  const fetchFieldTypes = async (): Promise<ITypes[]> => {
    return await fieldTypes
      .readAll()
      .then(result => {
        $store.dispatch('setFieldTypes', result)

        return result
      })
  }

  const getFieldTypeById = (id: string) => {
    return computed(() => $store.getters.getFieldTypeById(id)).value
  }

  return {
    fetchFieldTypes,
    getFieldTypeById,
  }
}