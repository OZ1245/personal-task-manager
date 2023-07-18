<template>
  <IndexLayout/>
</template>

<script setup>
import IndexLayout from '@/layouts/IndexLayout.vue';

import { useUser } from '@/libs/user';

const $user = useUser()

$user.checkSession()
  .then(result => {
    if (result) {
      $user.fetchUser()
    }
  })
</script>