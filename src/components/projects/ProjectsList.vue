<template>
  <h1>Projects</h1>
  <!-- <pre>{{ projectsList }}</pre> -->
  <ul v-if="projectsList.length">
    <li v-for="(project, i) in projectsList" :key="`project-${i}`">
      <h2>{{ project.name }}</h2>
      <ul>
        <li>
          <strong>Created:</strong>
          {{ project.created }}
        </li>
      </ul>
      <button type="button" @click="onEditProject(project.id)">Edit</button>
      <button type="button" @click="onDeleteProject(project.id)">Delete</button>
    </li>
  </ul>  

  <p v-else>No projects, yet...</p>
</template>

<script setup>
import { computed } from 'vue'
import { useProject } from '@/libs/project'
import { useRouter } from 'vue-router';

const $router = useRouter()
const $project = useProject()

$project.fetchProjects()

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