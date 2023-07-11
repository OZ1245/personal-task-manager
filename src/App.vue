<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>

<script setup>
import { supabase } from '@/libs/supabase'

import { onMounted, ref } from 'vue'
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'

const session = ref()

onMounted(() => {
  console.log('--- onMounted hook ---')
  console.log('session:', session)

  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>