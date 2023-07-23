<template>
  <aside class="sidebar">
    <div class="sidebar__datepicker">
      Today
      <button type="button">\/</button>
    </div>

    <div class="sidebar__task-list">
      <PlanTasksList/>
    </div>
  </aside>
</template>

<script setup>
import PlanTasksList from '@/components/tasks/PlanTasksList.vue';
</script>

<style lang="scss">
.sidebar {
  width: 250px;
  border-right: 1px solid gray;
  padding: 16px;
}
</style>