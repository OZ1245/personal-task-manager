import dayjs from "dayjs"
require(`dayjs/locale/ru`)

const language = localStorage.getItem('language')
const locale = language ? language : 'en'

if (locale === 'ru') {
  dayjs.locale('ru')
}
  
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

export default {
  install: (app) => {
    const globalDayjs = dayjs

    // This is what you want:
    app.config.globalProperties.$dayjs = globalDayjs

    // But this is the recommended approach:
    app.provide('dayjs', globalDayjs)

    // feel free to use both at once though
  }
}