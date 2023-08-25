export default {
  install: (app) => {
    const backdrop = document.createElement('div')
    backdrop.classList.add('_backdrop')

    app.directive('loading', {
      created(el) {
        el.classList.add('_loading')
        el.appendChild(backdrop)
      },

      mounted(el) {
        el.classList.add('_loading')
        el.appendChild(backdrop)
      },

      // updated(el, { value, oldValue }) {
      updated(el, { value }) {
        // console.log('el:', el)
        // console.log('value:', value)
        // console.log('oldValue:', oldValue)

        // if (value !== oldValue) {
          if (value) {
            // console.log('add loader')
            el.classList.add('_loading')
            el.appendChild(backdrop)
          } else {
            // console.log('remove loader')
            el.removeChild(backdrop)
            el.classList.remove('_loading')
          }
        // }
      },

      // unmounted(el) {
      //   el.removeChild(backdrop)
      //   el.classList.remove('_loading')
      // }
    })
  }
}