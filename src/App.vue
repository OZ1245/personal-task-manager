<template>
  <div 
    v-if="loading"
    class="app-loader"
    >
    <ArrowPathIcon class="app-loader__icon"/>
    Loading...
  </div>

  <component :is="layoutIs"> 
    <router-view /> 
  </component>

  <ModalWrapper/>
</template>

<script setup>
import { markRaw, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUser } from '@/libs/user';

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ModalWrapper from '@/components/UI/Modal.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const $route = useRoute()
const $user = useUser()

const loading = ref(true)
const layoutIs = ref()

$user.checkSession()
  .then(result => {
    if (result) {
      $user
        .fetchUser()
        .then(data => {
          console.log('data:', data)
        })
    } else {
      $user.logout()
    }
      
    loading.value = false
  })

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

<style lang="scss">
@import '@/scss/mixins';

.app-loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--padding-block);

  width: 100%;
  height: 100%;
}
.app-loader__icon {
  @include circle-animation(1.2s);

  width: calc(var(--icon-size-big) * 2);
  height: calc(var(--icon-size-big) * 2);
  
}
</style>