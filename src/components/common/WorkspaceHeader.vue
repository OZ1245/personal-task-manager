<template>
  <header class="workspace-header">
    <div class="workspace-header__left">
      <router-link 
        :to="{
          name: 'Home'
        }"
        title="To Home"
        >
        <ArrowLeftIcon class="workspace-header__back-icon"/>
      </router-link>
      
      <h1 class="workspace-header__project-title">
        {{ project?.name }}
      </h1>

      <router-link 
        :to="{
          name: 'EditProject',
          params: {
            projectId: project?.id
          }
        }"
        title="Settings"
      >
        <Cog6ToothIcon class="workspace-header__settings-icon"/>
      </router-link>
    </div>

    <div class="workspace-header__right">{{ user?.settings.name || 'User Name' }}</div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useProject } from '@/libs/project'
import { useUser } from '@/libs/user'
import { Cog6ToothIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

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

  padding-inline: var(--padding-inline);
  padding-block: var(--padding-block);
  border-bottom: 1px solid var(--border-color);
}
.workspace-header__left {
  display: inline-flex;
  align-items: center;
  gap: var(--padding-inline);
}
.workspace-header__back-icon {
  width: var(--icon-size-big);
  height: var(--icon-size-big);
  color: var(--text-base);
}
.workspace-header__project-title {
  font-weight: 500;
  font-size: 22px;
  margin: 0;
}
.workspace-header__settings-icon {
  width: var(--icon-size-big);
  height: var(--icon-size-big);
  color: var(--text-base);
}
</style>