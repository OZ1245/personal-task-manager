<template>
  <div class="tasks-list">
    <div class="tasks-list__header">
      <h2 class="tasks-list__title">Tasks list</h2>
      <button 
        type="button" 
        class="tasks-list__button"
        @click="onCreateTask()"
      >
        +
      </button>
    </div>
    <ul>
      <li>Task 1</li>
      <li>Task 2</li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const $router = useRouter()

const onCreateTask = () => {
  $router.push({
    name: 'CreateTask'
  })
}
</script>