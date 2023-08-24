<template>
  <div class="layout layout--detault">
    <DefaultHeader/>

    <section class="layout__main">
      <slot></slot>
    </section>

    <footer class="layout__footer"></footer>
  </div>  
</template>

<script setup>
import DefaultHeader from '@/components/common/DefaultHeader.vue'
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.layout__header {
  width: 100%;
}
.layout__main {
  flex-grow: 1;
  // width: 100%;
  height: 100%;
  overflow: hidden;
}
.layout__footer {
  width: 100%;
}
</style>