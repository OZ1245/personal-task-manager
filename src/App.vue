<template>
  <router-view/>
</template>

<script setup>
import { useUser } from './libs/user';

const $user = useUser()

$user.checkSession()
  .then(result => {
    if (result) {
      $user.fetchUser()
    }
  })
</script>