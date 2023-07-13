<template>
  <h1>Create project</h1>
  
  <ProjectForm
    :data="form"
  />

  <button type="button" @click="onCreateProject">Create</button>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import ProjectForm from '@/components/projects/ProjectForm.vue'

import { useProject } from '@/libs/project'

const $router = useRouter()
const $project = useProject()

const form = reactive({
  name: null,
  settings: {
    fields: []
  }
})

const onCreateProject = () => $project
  .createProject(form)
  .then(() => {
    $router.push({
      name: 'Home'
    })
  })
</script>