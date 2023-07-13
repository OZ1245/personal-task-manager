<template>
  <h1>{{ $t('HOME_PROJECTS') }}</h1>

  <p v-if="loading">Loading data...</p>

  <div v-if="!loading">
    <!-- <pre>{{ projectsList }}</pre> -->
    <ul v-if="projectsList.length">
      <li v-for="(project, i) in projectsList" :key="`project-${i}`">
        <h2>{{ project.name }}</h2>
        <ul>
          <li>
            <strong>{{ $t('CREATED') }}:</strong>
            {{ $dayjs(project.created).format('LL') }}
          </li>
        </ul>
        <button type="button" @click="onEditProject(project.id)">Edit</button>
        <button type="button" @click="onDeleteProject(project.id)">Delete</button>
      </li>
    </ul>  

    <p v-else>No projects, yet...</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';

// import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useProject } from '@/libs/project'

const $router = useRouter()
const $project = useProject()
const $t = useI18n().t 

$project
  .fetchProjects()
  .then(() => {
    loading.value = false
  })

const loading = ref(true)

const projectsList = computed(() => $project.getProjects())

const onDeleteProject = (id) => {
  if (confirm('You are sure?')) {
    $project.deleteProject(id)
  }
}

const onEditProject = (id) => {
  $router.push({
    name: 'EditProject',
    params: {
      id
    }
  })
}
</script>