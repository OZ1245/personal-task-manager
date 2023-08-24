<template>
  <div class="home">
    <ProjectsList/>
    
    <!-- <button type="button" @click="onSignOut">Sign Out</button> -->
  </div>
</template>

<script setup>
// import { useUser } from '@/libs/user'
import ProjectsList from '@/components/projects/ProjectsList.vue'

// const $user = useUser()
// FIXME: Убрать
// const onSignOut = () => $user.logout()
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;

  height: 100%;
}
</style>
