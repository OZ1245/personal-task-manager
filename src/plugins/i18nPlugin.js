export default {
  install: (app, options) => {
    const globalT = options.global.t

    app.config.globalProperties.$t = globalT

    app.provide('t', globalT)
  }
}