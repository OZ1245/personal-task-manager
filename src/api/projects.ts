import { supabase } from '@/libs/supabase'

export interface IProjectSettings {
  fields: {
    id: number,
    name: string,
    rows: number,
    dayly: boolean,
    rules: any[],
    search: boolean,
    date_now: boolean,
    editable: boolean,
    multipty: boolean,
    nested_items: any[],
    default_value: any,
    field_type_id: number
  }
}

export interface IProject {
  id: string,
  created: string,
  name: string,
  settings: IProjectSettings
}

export interface IProjectParams {
  settings: IProjectSettings,
  user_id: string,
  name: string,
}

/**
 * Вставить одну запись
 * @param {Object} params 
 * @returns {Object} Запись
 */
const insertRow = (params: IProjectParams): PromiseLike<IProject | any> => {
  return supabase
    .from('Projects')
    .insert([params])
    .select()
    .then(({ data, error }) => {
      if (error) throw error
      
      return data || null
    })
}

/**
 * Вставить несколько записей
 * @param {Array} params 
 * @returns {Array} Записи
 */
const insertRows = (params: IProjectParams[]): PromiseLike<IProject[]> => {
  return supabase
    .from('Projects')
    .insert(params)
    .select()
    .then(({ data, error }) => {
      if (error) throw error

      return data || []
    })
}

/**
 * Получить проект по Id
 * @param {Integer} id Id проекта
 * @returns 
 */
const readById = (id: string): PromiseLike<IProject> => {
  return supabase
    .from('Projects')
    .select('*')
    .eq('id', id)
    .then(({ data, error }) => {
      if (error) throw error

      return data ? data[0] : null
    })
}

/**
 * Получить проекты по Id пользователя
 * @param {Integer} userId 
 * @returns 
 */
const readByUserId = (userId: string): PromiseLike<IProject[]> => {
  return supabase
    .from('Projects')
    .select('*')
    .eq('user_id', userId)
    .then(({ data, error }) => {
      if (error) throw error

      return data || []
    })
}

/**
 * Обновить запись
 * @param {Object} params Данные для вставки 
 * @param {Integer} id Id записи 
 * @returns 
 */
const updateById = (params: IProjectParams, id: string): PromiseLike<IProject | any> => {
  return supabase
    .from('Projects')
    .update(params)
    .eq('id', id)
    .select()
    .then(({ data, error }) => {
      if (error) throw error

      return data || null
    })
}

/**
 * Удалить запись по Id
 * @param {Integer} id 
 * @returns null
 */
const deleteById = (id: string): PromiseLike<boolean> => {
  return supabase
    .from('Projects')
    .delete()
    .eq('id', id)
    .then(response => {
      return (response.status === 204)
    })
}

/**
 * Удалить все записи по id пользователя
 * @param {Integer} userId 
 * @returns 
 */
const deleteByUserId = (userId: string): PromiseLike<boolean> => {
  return supabase
    .from('Projects')
    .delete()
    .eq('user_id', userId)
    .then(response => {
      return (response.status === 204)
    })
}

export default {
  insertRow,
  insertRows,
  readById,
  readByUserId,
  updateById,
  deleteById,
  deleteByUserId,
}