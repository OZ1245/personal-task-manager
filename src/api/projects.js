import { supabase } from '@/libs/supabase'

/**
 * Вставить одну запись
 * @param {Object} params 
 * @returns {Object} Запись
 */
const insertRow = (params) => {
  return supabase
    .from('Projects')
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
 * Вставить несколько записей
 * @param {Array} params 
 * @returns {Array} Записи
 */
const insertRows = (params) => {
  return supabase
    .from('Projects')
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

/**
 * Получить проект по Id
 * @param {Integer} id Id проекта
 * @returns 
 */
const readById = (id) => {
  return supabase
    .from('Projects')
    .select('*')
    .eq('id', id)
    .then(({ data, error }) => {
      console.log('project by id data:', data)
      if (error) throw error

      return data[0]
    })
    .catch(error => {
      throw error.message
    })
}

/**
 * Получить проекты по Id пользователя
 * @param {Integer} userId 
 * @returns 
 */
const readByUserId = (userId) => {
  return supabase
    .from('Projects')
    .select('*')
    .eq('user_id', userId)
    .then(({ data, error }) => {
      console.log('project by id data:', data)
      if (error) throw error

      return data.Projects
    })
    .catch(error => {
      throw error.message
    })
}

/**
 * Обновить запись
 * @param {Object} Пареметры: 
 * @param {Object} params Данные для вставки 
 * @param {Integer} id Id записи 
 * @returns 
 */
const updateById = ({ params, id }) => {
  return supabase
    .from('Projects')
    .update(params)
    .eq('id', id)
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
 * Удалить запись по Id
 * @param {Integer} id 
 * @returns null
 */
const deleteById = (id) => {
  return supabase
    .from('Projects')
    .delete()
    .eq('id', id)
    .then(response => {
      console.log('response:', response)
      return (response.status === 204)
    })
    .catch(error => {
      throw error.message
    })
}

/**
 * Удалить все записи по id пользователя
 * @param {Integer} userId 
 * @returns 
 */
const deleteByUserId = (userId) => {
  return supabase
    .from('Projects')
    .delete()
    .eq('user_id', userId)
    .then(response => {
      return (response.status === 204)
    })
    .catch(error => {
      throw error.message
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