<template>
  <IndexLayout v-if="!loading"/>

  <div 
    v-else
    class="app-loader"
  >
    <ArrowPathIcon class="app-loader__icon"/>
    Loading...
  </div>

  <ModalWrapper/>
</template>

<script setup>
import { ref } from 'vue'
import IndexLayout from '@/layouts/IndexLayout.vue'
import ModalWrapper from '@/components/UI/Modal.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

import { useUser } from '@/libs/user';

const $user = useUser()

const loading = ref(true)

$user.checkSession()
  .then(result => {
    if (result) {
      $user
        .fetchUser()
        .then(() => {
          loading.value = false
        })
    }
  })
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