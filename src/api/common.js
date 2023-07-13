import { supabase } from "@/libs/supabase"

const getColumnsTypes = (tableName) => {
  return supabase
    .rpc('get_column_types', {
      tname: tableName
    })
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
}

export default {
  getColumnsTypes
}