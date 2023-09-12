import { supabase } from "@/libs/supabase"

export interface ITypes {
  id: number,
  code: string,
  name: string,
  description: string
}

/**
 * Получить все записи
 * @returns {Array} 
 */
const readAll = (): PromiseLike<ITypes[]> => {
  return supabase
    .from('FieldsTypes')
    .select('*')
    .then(({ data, error }) => {
      if (error) throw error

      return data || []
    })
    // .then((error: any) => {
    //   throw error.message
    // })
}

export default {
  readAll,
}