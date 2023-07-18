import { supabase } from "@/libs/supabase"

/**
 * Получить все записи
 * @returns {Array} 
 */
const readAll = () => {
  return supabase
    .from('FieldsTypes')
    .select('*')
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
}

export default {
  readAll,
}