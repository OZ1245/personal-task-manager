import translationsApi from "@/api/translations"

export function useTranslations() {
  const fetchTranslations = async () => {
    const userLanguage = localStorage.getItem('language')
    const locale = userLanguage ? userLanguage : 'en'

    return await translationsApi
      .readAll()
      .then(async result => {
        console.log('result:', result)

        // TODO: Сообразить систему локалей
        const messages = {
          en: null,
          ru: null
        }

        result.map(item => {
          messages.en = {
            ...messages.en,
            [item.key]: item['lang:en']
          }
          messages.ru = {
            ...messages.ru,
            [item.key]: item['lang:ru']
          }
        })

        console.log('messages:', messages)

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


