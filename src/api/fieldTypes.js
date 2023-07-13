import { supabase } from "@/libs/supabase"

/**
 * Получить все записи
 * @returns {Array} 
 */
const readAll = () => {
  console.log('--- fieldTypes readAll api method ---')
  return supabase
    .from('FieldsTypes')
    .select('*')
    .then(({ data, error }) => {
      console.log('data:', data)
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