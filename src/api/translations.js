import { supabase } from "@/libs/supabase"

const readAll = () => {
  return supabase
    .from('Translations')
    .select('*')
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
  }
  
const readByKey = (key) => {
  return supabase
    .from('Translations')
    .select('*')
    .eq('key', key)
    .then(({ data, error }) => {
      if (error) throw error

      return data[0]
    })
    .catch(error => {
      throw error.message
    })
}

/**
 * Все фразы определенного языка
 * @param {String} lang 
 * @returns Список фраз
 */
const readMessagesFromLanguage = (lang) => {
  return supabase
    .from('Translations')
    .select(`lang:${lang}`)
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .catch(error => {
      throw error.message
    })
}

const readMessageFromLanguage = ({ key, lang }) => {
  return supabase
    .from('Translations')
    .select(`lang:${lang}`)
    .eq('key', key)
    .then(({ data, error }) => {
      if (error) throw error

      return data[0]
    })
    .catch(error => {
      throw error.message
    })
}

export default {
  readAll,
  readByKey,
  readMessagesFromLanguage,
  readMessageFromLanguage,
}