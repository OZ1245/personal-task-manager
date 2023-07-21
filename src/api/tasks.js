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

export default {
  insertRow
}