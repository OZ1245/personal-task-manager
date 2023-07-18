import translationsApi from "@/api/translations"

export function useTranslations() {
  /**
   * Запросить все переводы
   * @returns {Promise} Массив переводов
   */
  const fetchTranslations = async () => {
    const userLanguage = localStorage.getItem('language')
    const locale = userLanguage ? userLanguage : 'en'

    return await translationsApi
      .readAll()
      .then(async result => {
        // TODO: Сообразить систему локалей
        const messages = {
          en: null,
          ru: null
        }

        result.map(item => {
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


