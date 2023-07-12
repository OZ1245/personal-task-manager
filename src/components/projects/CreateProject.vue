<template>
  <h1>Create project</h1>
  <form>
    <label for="">Name</label>
    <input type="text" v-model="form.name">

    <hr>

    <h2>Settings</h2>

    <h3>Fields</h3>
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

    <button type="button" @click="onCreateProject">Create</button>
  </form>  
</template>

<script setup>
import { reactive } from 'vue';
import { useProject } from '@/libs/project'
import { useRouter } from 'vue-router';

const $router = useRouter()
const $project = useProject()

const form = reactive({
  name: null,
  settings: {
    fields: [
      {
        name: null,
        editable: true,
        multipty: false,
        default_value: null
      }
    ]
  }
})

const onCreateProject = () => $project
  .createProject(form)
  .then(result => {
    console.log('result:', result)

    $router.push({
      name: 'Home'
    })
  })
</script>