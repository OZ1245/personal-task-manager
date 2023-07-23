import { supabase } from "@/libs/supabase"

/**
 * Создать задачу
 * @returns {Object} 
 */
const insertRow = (params) => {
  return supabase
    .from('Tasks')
    .insert([params])
    .select()
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
}

/**
 * Получить задачи по датам
 * @param {Array} params Список дат, по которым нужно найти задачу
 * @returns {Array}
 */
const readRowsByDate = (params) => {
  return supabase
    .from('Tasks')
    .select('*')
    .contains('history', params)
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
}

export default {
  insertRow,
  readRowsByDate,
}