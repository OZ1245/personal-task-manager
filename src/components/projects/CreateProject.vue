<template>
  <div class="project-settings">
    <TheSidebar>
      <!-- TODO: -->
      <template #header>
        <h2 class="sidebar__title">
          Templates
        </h2>
      </template>

      <!-- <div class="project-settings__templates-list">

      </div> -->
      <TemplatesList/>
    </TheSidebar>

    <div class="project-settings__main">
      <div class="project-settings__header">
        <h1 class="project-settings__title">Create project</h1>
    
        <TheInput
          v-model="form.name"
          label="Name"
          inputType="text"
          autocomplete="off"
        />
      </div>

      <div class="project-settings__body">
        <ProjectForm
          :data="form"
        />
      </div>

      <div class="project-settings__footer">
        <div class="project-settings__template-settings">
          <TheCheckbox
            v-model="saveTemplateOption"
            label="Сохранить настройки в шаблон"
            class="project-settings__template-checkbox"
            @update:modelValue="onCheckTemplate"
          />

          <TheInput
            v-if="saveTemplateOption"
            v-model="templateName"
            ref="templateNameInput"
            label="Название шаблона"
            inputType="text"
            autocomplete="off"
            horizontal
            class="project-settings__template-name-input"
          />
        </div>

        <div class="project-settings__controls">
          <TheButton 
            second
            medium
            class="project-settings__button"
            @click="onCancel"
          >
            <XMarkIcon class="project-settings__button-icon"/>
            Cancel
          </TheButton>

          <TheButton 
            accent 
            medium
            :disabled="!validate"
            class="project-settings__button"
            @click="onCreateProject"
          >
            <CheckIcon class="project-settings__button-icon"/>
            Create
          </TheButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProject } from '@/libs/project'

import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import ProjectForm from '@/components/projects/ProjectForm.vue'
import TheInput from '@/components/UI/form/TheInput.vue'
import TheButton from '@/components/UI/TheButton.vue'
import TheSidebar from '@/components/common/TheSidebar.vue'
import TheCheckbox from '@/components/UI/form/TheCheckbox.vue'
import TemplatesList from '@/components/projects/TemplatesList.vue'

const $router = useRouter()
const $project = useProject()

const form = reactive({
  name: '',
  settings: {
    fields: []
  },
})

const saveTemplateOption = ref(false)
const templateName = ref('')
const templateNameInput = ref(null)

const validate = computed(() => {
  if (!form.name.length) {
    return false
  }

  if (form[1] && !form[1].length) {
    return false
  }

  return true
})

const onCheckTemplate = (value) => {
  nextTick(() => {
    if (value) {
      templateNameInput.value.$refs.input.focus()
    }
  })
}

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

<style lang="scss">
// Main
.project-settings {
  display: flex;
  height: 100%;
}

.project-settings__main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

// Header
.project-settings__header {
  display: flex;
  flex-direction: column;
  gap: var(--padding-block);

  padding-block: var(--padding-block);
  padding-inline: var(--padding-inline);

  border-bottom: 1px solid var(--border-color);
}
.project-settings__title {
  font-size: var(--font-size-b);
  margin: 0;
}

// Body
.project-settings__body {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  padding-block: var(--padding-block);
  padding-inline: var(--padding-inline);
}

// Footer
.project-settings__footer {
  display: flex;
  flex-direction: column;
  gap: var(--padding-block);

  padding-block: var(--padding-block);
  padding-inline: var(--padding-inline);

  border-top: 1px solid var(--border-color);
}
.project-settings__template-settings {
  display: flex;
  align-items: center;
  gap: var(--padding-inline);
}
.project-settings__template-checkbox {
  flex-shrink: 0;
}
.project-settings__template-name-input {
  width: 100%;
  flex-grow: 0;
}
.project-settings__controls {
  display: flex;
  justify-content: space-between;
}
.project-settings__button-icon {
  width: var(--icon-size);
  height: var(--icon-size);
}
</style>