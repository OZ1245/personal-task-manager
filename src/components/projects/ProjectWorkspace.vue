<template>
  <TasksSidebar/>

  <main class="tasks-area">
    <router-view></router-view>
  </main>
</template>

<script setup>
import TasksSidebar from '@/components/tasks/TasksSidebar.vue'
</script>

<style lang="scss">
.tasks-area {
  flex-grow: 1;
}
</style>
