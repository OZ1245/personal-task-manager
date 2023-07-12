<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="onSignOut">Sign Out</button>
  </div>
</template>

<script setup>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { useUser } from '@/libs/user'

const $user = useUser()
const onSignOut = () => $user.logout()
</script>
