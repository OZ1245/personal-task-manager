<template>
  <div class="project-settings">
    <div class="project-settings__header">
      <h1>Create project</h1>
  
      <label for="">Name</label>
      <input type="text" v-model="form.name">

      <hr>
    </div>

    <div class="project-settings__body">
      <ProjectForm
        :data="form"
      />
    </div>

    <div class="project-settings__footer">
      <input 
        type="checkbox" 
        v-model="saveTemplateOption"
        id="save-template-checkbox"
      />
      <label for="save-template-checkbox">
        Сохранить настройки в шаблон
      </label>

      <template v-if="saveTemplateOption">
        <br>
        <label>Название шаблона</label>
        <input type="text" v-model="templateName">
      </template>

      <br>

      <button type="button" @click="onCancel">Cancel</button>
      <button type="button" @click="onCreateProject">Create</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import ProjectForm from '@/components/projects/ProjectForm.vue'

import { useProject } from '@/libs/project'

const $router = useRouter()
const $project = useProject()

const form = reactive({
  name: null,
  settings: {
    fields: []
  },
})

const saveTemplateOption = ref(false)
const templateName = ref('')

const onCreateProject = () => $project
  .createProject({
    params: form,
    saveTemplateOption: saveTemplateOption.value,
    templateName: templateName.value
  })
  .then(() => {
    $router.push({
      name: 'Home'
    })
  })

const onCancel = () => $router.back()
</script>