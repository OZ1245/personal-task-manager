import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import { useTranslations } from '@/libs/translations'
import dayjsPlugin from '@/plugins/dayjsPlugin'
import i18nPlugin from './plugins/i18nPlugin'

const $translations = useTranslations()

$translations
  .fetchTranslations()
  .then(data => {
    const i18n = createI18n({
      legacy: false,
      locale: data.locale,
      globalInjection: true,
      messages: data.messages,
    })

    createApp(App)
      .use(store)
      .use(router)
      .use(i18n)
      .use(i18nPlugin, i18n)
      .use(dayjsPlugin)
      .mount('#app')
  })
