<template>
  <template v-if="!loading">
    <TasksSidebar/>
    
    <main class="tasks-area">
      <router-view class="task-area__container"></router-view>
    </main>
  </template>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useProject } from '@/libs/project'
import TasksSidebar from '@/components/tasks/TasksSidebar.vue'
import dayjs from 'dayjs';

const $router = useRouter()
const $route = useRoute()
const $project = useProject()

const loading = ref(true)

if (!$route.params.date) {
  $router.push({
    name: 'ProjectWorkspace',
    params: {
      date: dayjs().format('YYYY-MM-DD')
    }
  })
}

$project
  .fetchProject($route.params.projectId)
  .then(() => {
    loading.value = false
  })
</script>

<style lang="scss">
.tasks-area {
  flex-grow: 1;
  display: flex;
}
.task-area__container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
