<template>
  <aside class="sidebar">
    <div class="sidebar__datepicker">
      Today
      <button type="button">\/</button>
    </div>

    <div class="sidebar__task-list">
      <TasksList/>
    </div>
  </aside>
</template>

<script setup>
import TasksList from '@/components/tasks/TasksList.vue';
</script>