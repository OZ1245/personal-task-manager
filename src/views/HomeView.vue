<template>
  <div class="home">
    <ProjectsList/>
    <button type="button" @click="onCreateProject">Create project</button>
    <button type="button" @click="onSignOut">Sign Out</button>
  </div>
</template>

<script setup>
import { useUser } from '@/libs/user'
import ProjectsList from '@/components/projects/ProjectsList.vue'
import { useRouter } from 'vue-router';

const $user = useUser()
const $router = useRouter()
const onSignOut = () => $user.logout()

const onCreateProject = () => $router.push({
  name: 'CreateProject'
})
</script>
