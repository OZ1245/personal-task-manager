<template>
  <div class="home">
    <h1>PERSONAL <br> TASK MANAGER</h1>

    <ProjectsList/>
    
    <button type="button" @click="onSignOut">Sign Out</button>
  </div>
</template>

<script setup>
import { useUser } from '@/libs/user'
import ProjectsList from '@/components/projects/ProjectsList.vue'

const $user = useUser()
const onSignOut = () => $user.logout()
</script>
