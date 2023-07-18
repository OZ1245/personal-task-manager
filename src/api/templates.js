import { supabase } from "@/libs/supabase"

const insertRow = (params) => {
  return supabase
    .from('Templates')
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