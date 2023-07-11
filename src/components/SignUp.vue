<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <form @submit.prevent="onSignUp">
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />

    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    
    <button type="submit">Sign Up</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useUser } from '@/libs/user'

const $user = useUser()

const email = ref('')
const password = ref('')

const onSignUp = () => $user.createUser({
  email: email.value,
  password: password.value
})
</script>