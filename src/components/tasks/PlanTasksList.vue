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
          <PlusIcon class="plan-task-list__button-icon"/>
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
    <template v-if="!loading">
      <ul v-if="tasksList.length">
        <li>Task 1</li>
        <li>Task 2</li>
      </ul>

      <p v-else>
        No tasks...
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, defineProps, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import Dropdown from '@/components/UI/Dropdown'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { useTask } from '@/libs/task';

const $router = useRouter()
const $task = useTask()

const props = defineProps({
  date: {
    type: String,
    required: true,
  }
})

const loading = ref(true)
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
const tasksList = ref([])

const onAddTaskToPlan = (event) => {
  if (event.value === 'create') {
    $router.push({
      name: 'CreateTask'
    })
  }

  if (event.value === 'add') {
    // TODO:
  }

  showAddTaskToPlanDropdown.value = false
}

watchEffect(() => {
  $task
    .fetchTasksByDate(props.date)
    .then(result => {
      tasksList.value = result
      loading.value = false
    })
})
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
.plan-task-list__button-icon {
  width: var(--icon-size);
  height: var(--icon-size);
  color: var(--background);
}
</style>