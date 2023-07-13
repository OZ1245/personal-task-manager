<template>
  <Layout>
    <router-view/>
  </Layout>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { useUser } from './libs/user';
import { useRoute } from 'vue-router';

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