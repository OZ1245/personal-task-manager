<template>
  <div class="layout layout--detault">
    <WorkspaceHeader/>

    <section class="layout__main">
      <slot></slot>
    </section>
  </div>  
</template>

<script setup>
import WorkspaceHeader from '@/components/common/WorkspaceHeader.vue'
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