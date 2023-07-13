<template>
  <Layout>
    <router-view/>
  </Layout>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

import { useUser } from './libs/user';

const $route = useRoute()
const $user = useUser()

const Layout = defineAsyncComponent(() => {
  return import(`@/layouts/${$route.meta.layout || 'DefaultLayout'}.vue`)
})

$user.checkSession()
  .then(result => {
    if (result) {
      $user.fetchUser()
    }
  })
</script>