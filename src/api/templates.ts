import { supabase } from "@/libs/supabase"
import { IProjectSettings } from "@/api/projects"

export interface ITemplate {
  id: number,
  created: string,
  name: string,
  user_id: string,
  settings: IProjectSettings,
  default: boolean
}

const tableName = 'Templates'

const insertRow = (params: {
  settings: IProjectSettings,
  user_id: string,
  name: string,
}): PromiseLike<ITemplate | any> => {
  return supabase
    .from(tableName)
    .insert(params)
    .select()
    .then(({ data, error }) => {
      if (error) throw error

      return data || null
    })
}

const selectRows = (): PromiseLike<ITemplate[]> => {
  return supabase
    .from(tableName)
    .select('*')
    .then(({ data, error }) => {
      if (error) throw error

      return data || []
    })
}

export default {
  insertRow,
  selectRows
}