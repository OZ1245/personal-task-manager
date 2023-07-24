<template>
  <IndexLayout v-if="!loading"/>
  <div 
    v-else
    class="app-loader"
  >
    Loading...
  </div>

  <ModalWrapper/>
</template>

<script setup>
import { ref } from 'vue'
import IndexLayout from '@/layouts/IndexLayout.vue';
import ModalWrapper from '@/components/UI/Modal.vue'

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
.app-loader {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>