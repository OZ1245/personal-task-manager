<template>
  <component :is="layoutIs"> 
    <router-view /> 
  </component>
</template>

<script setup>
  import DefaultLayout from '@/layouts/DefaultLayout.vue'
  import { markRaw, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const layoutIs = ref()
  const $route = useRoute()

  watch(
    () => $route.meta?.layout,
    async (layout) => {
      try {
        const component = layout && await import(`@/layouts/${layout}Layout.vue`)
        layoutIs.value = markRaw(component?.default || DefaultLayout)
      } catch (e) {
        layoutIs.value = markRaw(DefaultLayout)
      }
    },
    { immediate: true }
  )
</script>