import { supabase } from "@/libs/supabase"

// Interfaces
export interface ITranslations {
  id: string,
  created: string,
  modified?: string,
  constant: string,
  'lang:en': string,
  'lang:ru': string,
}

// Methods
const tableName = 'Translations'

/**
 * Получить все переводы
 * @returns Список фраз
 */
const readAll = (): PromiseLike<ITranslations[]> => {
  return supabase
    .from(tableName)
    .select('*')
    .then(({ data, error }) => {
      if (error) throw error

      return data || []
    })
  }
  
const readByKey = (key: string): PromiseLike<ITranslations> => {
  return supabase
    .from(tableName)
    .select('*')
    .eq('key', key)
    .then(({ data, error }) => {
      if (error) throw error

      return data ? data[0] : null
    })
    .then((error: any) => {
      throw error.message
    })
}

/**
 * Все фразы определенного языка
 * @param {String} lang 
 * @returns Список фраз
 */
const readMessagesFromLanguage = (lang: string): PromiseLike<Array<ITranslations>> => {
  return supabase
    .from(tableName)
    .select(`lang:${lang}`)
    .then(({ data, error }) => {
      if (error) throw error

      return data
    })
    .then((error: any) => {
      throw error.message
    })
}

const readMessageFromLanguage = (params: { key: string, lang: string }): PromiseLike<Array<ITranslations>> => {
  const { key, lang } = params
  
  return supabase
    .from(tableName)
    .select(`lang:${lang}`)
    .eq('key', key)
    .then(({ data, error }) => {
      if (error) throw error

      return data ? data[0] : null
    })
    .then((error: any) => {
      throw error.message
    })
}

export default {
  readAll,
  readByKey,
  readMessagesFromLanguage,
  readMessageFromLanguage,
}