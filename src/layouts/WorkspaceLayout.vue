<template>
  <div class="layout layout--detault">
    <WorkspaceHeader/>

    <section class="layout__main">
      <slot></slot>
    </section>
  </div>  
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useProject } from '@/libs/project'
import WorkspaceHeader from '@/components/common/WorkspaceHeader.vue'

const $route = useRoute()
const $project = useProject()

$project.fetchProject($route.params.projectId)
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.layout__main {
  flex-grow: 1;

  display: flex;
  height: 100%;
}
</style>