import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import { useTranslations } from '@/libs/translations'
import dayjsPlugin from '@/plugins/dayjsPlugin'

const $translations = useTranslations()

$translations
  .fetchTranslations()
  .then(data => {
    console.log('data:', data)

    const i18n = createI18n({
      legacy: false,
      locale: data.locale,
      messages: data.messages
    })

    createApp(App)
      .use(store)
      .use(router)
      .use(i18n)
      .use(dayjsPlugin)
      .mount('#app')
  })
