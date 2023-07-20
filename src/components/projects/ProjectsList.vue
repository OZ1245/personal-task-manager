<template>
  <h2>{{ $t('HOME_PROJECTS') }}</h2>
  <button type="button" @click="onCreateProject">Create project</button>

  <p v-if="loading">Loading data...</p>

  <div v-if="!loading">
    <ul v-if="projectsList.length">
      <li v-for="(project, i) in projectsList" :key="`project-${i}`">
        <router-link :to="{
          name: 'ProjectWorkspace',
          params: {
            projectId: project.id
          }
        }">
          <h3>{{ project.name }}</h3>
        </router-link>
        <ul>
          <li>
            <strong>{{ $t('CREATED') }}:</strong>
            {{ $dayjs(project.created).format('LL') }}
          </li>
        </ul>
        <button type="button" @click="onEditProject(project.id)">Edit</button>
        <button type="button" @click="onDeleteProject(project.id)">Remove</button>
      </li>
    </ul>  

    <p v-else>No projects, yet...</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';

import { useProject } from '@/libs/project'

const $router = useRouter()
const $project = useProject()

$project
  .fetchProjects()
  .then(() => {
    loading.value = false
  })

const loading = ref(true)

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