<template>
  <div class="projects-list">
    <div class="projects-list__header">
      <h2 class="projects-list__title">
        {{ $t('HOME_PROJECTS') }}
      </h2>
      
      <TheButton 
        accent
        big
        width="200px"
        class="projects-list__button"
        :loading="loading"
        @click="onCreateProject"
      >
        <FolderPlusIcon class="projects-list__button-icon"/>
        Create project
      </TheButton>
    </div>

    <!-- <p v-if="loading">Loading data...</p> -->

    <!-- TODO: -->
    <div 
      v-loading="loading"
      class="projects-list__list-wrapper"
    >
      <ul 
        v-if="projectsList.length"
        class="projects-list__list"
      >
        <li 
          v-for="(project, i) in projectsList" 
          :key="`project-${i}`"
          class="projects-list__item"
        >
          <router-link 
            :to="{
              name: 'ProjectWorkspace',
              params: {
                projectId: project.id
              }
            }"
          >
            <h3 class="projects-list__title">
              {{ project.name }}
            </h3>
          </router-link>

          <ul class="projects-list__fieldset">
            <li class="projects-list__field">
              <label class="projects-list__label">
                {{ $t('CREATED') }}:
              </label>
              <span class="projects-list__value">
                {{ $dayjs(project.created).format('LL') }}
              </span>
            </li>
          </ul>

          <div class="projects-list__controls">
            <button type="button" @click="onEditProject(project.id)">Edit</button>
            <button type="button" @click="onDeleteProject(project.id)">Remove</button>
          </div>
        </li>
      </ul>  

      <TheAlert 
        v-else
        info
      >
        No projects, yet...
      </TheAlert>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';

import { useProject } from '@/libs/project'

import { FolderPlusIcon } from '@heroicons/vue/24/outline'
import TheButton from '@/components/UI/TheButton.vue'
import TheAlert from '../UI/TheAlert.vue'

const $router = useRouter()
const $project = useProject()

const loading = ref(true)

$project
  .fetchProjects()
  .then(() => {
    loading.value = false
  })

const projectsList = computed(() => $project.getProjects())

const onCreateProject = () => $router.push({
  name: 'CreateProject'
})

const onDeleteProject = (id) => {
  if (confirm('You are sure?')) {
    $project.deleteProject(id)
  }
}

const onEditProject = (id) => {
  $router.push({
    name: 'EditProject',
    params: {
      projectId: id
    }
  })
}
</script>

<style lang="scss">
.projects-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
  height: 100%;
  max-width: 800px;
}

.projects-list__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--padding-block);
  
  width: 100%;
  padding-block: var(--padding-block);
}
.projects-list__title {
  font-size: var(--font-size-m);
  margin: 0;
}

.projects-list__button {
  gap: var(--padding-inline);
}
.projects-list__button-icon {
  width: var(--icon-size-big);
  height: var(--icon-size-big);
}
</style>