<template>
  <div class="plan-tasks-list">
    <div class="plan-tasks-list__header">
      <h2 class="plan-tasks-list__title">Tasks list</h2>
      <div class="plan-tasks-list__button-wapper">
        <ButtonIcon 
          icon="Plus"
          ref="addTaskToPlanButton"
          big
          class="plan-tasks-list__button"
          @click="showAddTaskToPlanDropdown = true"
        />
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
      <ul 
        v-if="tasksList.length"
        class="plan-tasks-list__list"
      >
        <pre>{{ tasksList }}</pre>
      </ul>

      <p v-else>
        No tasks...
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, defineProps, watchEffect, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useTask } from '@/libs/task'

import Dropdown from '@/components/UI/Dropdown'
import ButtonIcon from '@/components/UI/ButtonIcon'
import dayjs from 'dayjs';

const $router = useRouter()
const $task = useTask()
const $bus = inject('bus')

const props = defineProps({
  date: {
    type: String,
    required: true,
    default: dayjs().format('YYYY-MM-DD')
  }
})

const loading = ref(true)
const showAddTaskToPlanDropdown = ref(false)
const dropdownItems = [
  {
    name: 'Create New Task',
    value: 'create',
    type: 'item'
  },
  {
    name: 'Add Task from List',
    value: 'add',
    type: 'item',
  },
]
const tasksList = ref([])

const onAddTaskToPlan = (event) => {
  if (event.value === 'create') {
    $router.push({
      name: 'Project.CreateTask',
      params: {
        date: props.date
      }
    })
  }

  if (event.value === 'add') {
    $router.push({
      name: 'Project.AddTasks',
      params: {
        date: props.date
      }
    })
  }

  showAddTaskToPlanDropdown.value = false
}

const fetchTasks = () => $task
  .fetchTasksByDate(props.date)
  .then(result => {
    tasksList.value = result
    loading.value = false
  })

watchEffect(fetchTasks)

$bus.on('updatedTaskList', fetchTasks)
</script>

<style lang="scss">
.plan-tasks-list {
  display: flex;
  flex-direction: column;
  gap: var(--padding-block);

  height: 100%;
}

// Header
.plan-tasks-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.plan-tasks-list__title {
  font-size: var(--font-size-b);
  font-weight: 500;
  margin: 0;
}
.plan-tasks-list__button-wapper {
  position: relative;
}
.plan-tasks-list__button {
  color: var(--text-base);
}

// List
.plan-tasks-list__list {
  flex-grow: 1;
  overflow-y: auto;
}
</style>