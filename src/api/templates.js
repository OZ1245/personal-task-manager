import { supabase } from "@/libs/supabase"

const tableName = 'Templates'

const insertRow = (params) => {
  return supabase
    .from(tableName)
    .insert(params)
    .select()
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
}

const selectRows = () => {
  return supabase
    .from(tableName)
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
  insertRow,
  selectRows
}