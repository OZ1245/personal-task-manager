import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import { useTranslations, ILocales } from '@/libs/translations'
import dayjsPlugin from '@/plugins/dayjsPlugin'
import i18nPlugin from '@/plugins/i18nPlugin'
import globalBus from '@/plugins/globalBusPlugin'
import vLoadingPlugin from './plugins/vLoadingPlugin'

import '@/scss/main.scss'
import '@vuepic/vue-datepicker/dist/main.css'
import '@/scss/plugins/vLoadingPlugin.scss'

const $translations = useTranslations()

$translations
  .fetchTranslations()
  .then((data: ILocales) => {
    const i18n: any = createI18n({
      legacy: false,
      locale: data.locale,
      fallbackLocale: 'ru',
      globalInjection: true,
      messages: data.messages as any,
    })

    createApp(App)
      .use(store)
      .use(router)
      .use(i18n)
      .use(i18nPlugin, i18n)
      .use(dayjsPlugin)
      .use(globalBus)
      .use(vLoadingPlugin)
      .mount('#app')
  })
