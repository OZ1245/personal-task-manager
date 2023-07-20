<template>
  <div class="project-settings">
    <div class="project-settings__header">
      <h1>Edit project</h1>

      <label for="">Name</label>
      <input type="text" v-model="form.name">

      <hr>
    </div>

    <div class="project-settings__body">
      <p v-if="loading">Loading data...</p>

      <ProjectForm
        v-if="!loading"
        :data="form"
      />
    </div>

    <div class="project-settings__footer">
      <button type="button" @click="onCancel">Cancel</button>
      <button type="button" @click="onUpdateProject">Save</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ProjectForm from '@/components/projects/ProjectForm.vue';

import { useProject } from '@/libs/project'

const $router = useRouter()
const $route = useRoute()
const $project = useProject()

const loading = ref(true)
const form = reactive({
  name: null,
  settings: {
    fields: []
  }
})

const projectData = computed(() => $project.getProject())

$project.fetchProject($route.params.projectId)
  .then(() => {
    form.name = projectData.value.name
    form.settings = projectData.value.settings
    loading.value = false
  })

const onUpdateProject = () => $project
  .updateProject(form, $route.params.projectId)
  .then(() => {
    $router.push({
      name: 'Home'
    })
  })

const onCancel = () => $router.back()
</script>