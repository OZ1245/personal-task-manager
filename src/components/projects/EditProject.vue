<template>
  <h1>Edit project</h1>

  <p v-if="loading">Loading data...</p>

  <form v-if="!loading">
    <label for="">Name</label>
    <input type="text" v-model="form.name">

    <hr>

    <h2>Settings</h2>

    <h3>Fields</h3>
    <template v-if="form.settings.fields.length">
      <div v-for="(field, i) in form.settings.fields" :key="`settings-field-${i}`">
        <label for="">Name</label>
        <input type="text" v-model="field.name">

        <label for="">Editable</label>
        <input type="checkbox" v-model="field.editable">

        <label for="">Multiply</label>
        <input type="checkbox" v-model="field.multipty">

        <label for="">Default value</label>
        <input type="text" v-model="field.default_value">
      </div>
    </template>

    <button type="button" @click="onUpdateProject">Save</button>
  </form>  
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { useProject } from '@/libs/project'
import { useRoute, useRouter } from 'vue-router';

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

$project.fetchProject($route.params.id)
  .then(() => {
    form.name = projectData.value.name
    form.settings = projectData.value.settings
    loading.value = false
  })

const onUpdateProject = () => $project
  .updateProject(form, $route.params.id)
  .then(() => {
    $router.push({
      name: 'Home'
    })
  })
</script>