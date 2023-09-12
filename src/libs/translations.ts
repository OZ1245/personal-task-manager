import translationsApi, { ITranslations } from "@/api/translations"

export interface IMessages {
  en: any,
  ru: any
}
export interface ILocales {
  locale: string,
  messages: IMessages
}

export function useTranslations() {
  /**
   * Запросить все переводы
   * @returns {Promise} Массив переводов
   */
  const fetchTranslations = async (): Promise<ILocales> => {
    const userLanguage = localStorage.getItem('language')
    const locale = userLanguage ? userLanguage : 'en'

    return await translationsApi
      .readAll()
      .then(async (result: ITranslations[]): Promise<ILocales> => {
        // TODO: Сообразить систему локалей
        const messages: IMessages = {
          en: null,
          ru: null
        }

        result.map((item: ITranslations) => {
          messages.en = {
            ...messages.en,
            [item.constant]: item['lang:en']
          }

          messages.ru = {
            ...messages.ru,
            [item.constant]: item['lang:ru']
          }
        })

        return {
          locale: locale,
          messages: messages
        }
      })
  }

  return {
    fetchTranslations,
  }
}


