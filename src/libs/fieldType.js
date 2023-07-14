import fieldTypes from "@/api/fieldTypes";

export function useFieldType() {

  /**
   * Запросить все типы
   * @returns {Promise} Массив типов
   */
  const fetchFieldTypes = async () => {
    return await fieldTypes
      .readAll()
      .then(result => {
        return result
      })
  }

  return {
    fetchFieldTypes,
  }
}