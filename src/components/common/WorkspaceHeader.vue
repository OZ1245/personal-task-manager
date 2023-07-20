<template>
  <header class="workspace-header">
    <div class="workspace-header__left">
      <router-link 
        :to="{
          name: 'Home'
        }"
        title="To Home"
        >
        {{ '<-' }}
      </router-link>
      
      <h1 class="workspace-header__project-title">
        {{ project?.name }}
      </h1>
    </div>

    <div class="workspace-header__right">{{ user?.settings.name || 'User Name' }}</div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useProject } from '@/libs/project'
import { useUser } from '@/libs/user'

const $user = useUser()
const $project = useProject()

const project = computed(() => $project.getProject())
const user = computed(() => $user.getUser())
</script>

<style lang="scss">
.workspace-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.workspace-header__left {
  display: inline-flex;
  align-items: center;
}
</style>