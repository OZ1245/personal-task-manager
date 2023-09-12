export default {
  install: (app: any, options: any) => {
    const globalT = options.global.t

    app.config.globalProperties.$t = globalT

    app.provide('t', globalT)
  }
}