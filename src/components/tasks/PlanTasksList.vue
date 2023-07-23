<template>
  <div class="plan-tasks-list">
    <div class="plan-tasks-list__header">
      <h2 class="plan-tasks-list__title">Tasks list</h2>
      <div class="plan-tasks-list__button-wapper">
        <button 
          ref="addTaskToPlanButton"
          type="button" 
          class="plan-tasks-list__button"
          @click="showAddTaskToPlanDropdown = true"
        >
          +
        </button>
        <Dropdown
          v-model="showAddTaskToPlanDropdown"
          :items="dropdownItems"
          trigger-ref-name="addTaskToPlanButton"
          @click="onAddTaskToPlan($event)"
        >
        </Dropdown>
      </div>
    </div>
    <ul>
      <li>Task 1</li>
      <li>Task 2</li>
    </ul>
  </div>
</template>

<script setup>
import Dropdown from '@/components/UI/Dropdown'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter()

const showAddTaskToPlanDropdown = ref(false)
const dropdownItems = [
  {
    name: 'Create New Task',
    value: 'create',
    type: 'link'
  },
  {
    name: 'Add Task from List',
    value: 'add',
    type: 'disabled',
  },
]

const onAddTaskToPlan = (event) => {
  console.log(event)

  if (event.value === 'create') {
    $router.push({
      name: 'CreateTask'
    })
  }

  if (event.value === 'create') {
    // TODO:
  }

  showAddTaskToPlanDropdown.value = false
}
</script>

<style lang="scss">
// .plan-tasks-list {}
.plan-tasks-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.plan-tasks-list__button-wapper {
  position: relative;
}
</style>