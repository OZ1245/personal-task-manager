<template>
  <ProjectsComponents/>

  <button type="button" @click="onCancel">Cancel</button>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()

const ProjectsComponents = defineAsyncComponent(() => {
  if ($route.name === 'CreateProject') {
    return import('@/components/projects/CreateProject.vue')
  }

  if ($route.name === 'EditProject') {
    return import('@/components/projects/EditProject.vue')
  }

  return import('@/components/projects/ProjectWorkspace.vue')
})

const onCancel = () => $router.back()
</script>