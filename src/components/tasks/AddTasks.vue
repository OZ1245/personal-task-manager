<template>
  <TaskAreaComponent
    title="Add tasks to plan"
    class="add-tasks"
  >
    <template #body>
      <ul
        v-if="taskList.length" 
        class="add-tasks__list"
      >
        <li
          v-for="(task, i) in taskList"
          :key="`task-${i}`"
          class="add-tasks__item"
        >
          <div class="add-tasks__content">
            <time class="add-tasks__date">
              {{ $dayjs(task.created).format('LL') }}
              {{ (task.modified) ? `(Modified: ${$dayjs(task.modified).format('LL')})` : '' }}
            </time>

            <h4 class="add-tasks__title">
              <strong>{{ task.data.TASK_NUMBER._value }}:</strong> 
              {{ task.data.NAME._value }}
            </h4>

            <div class="add-tasks__info">
              <p class="add-tasks__priority">
                <strong>Приоритет:</strong>
                {{ task.data.PRIORITY._value }}
              </p>
              <label class="add-tasks__status">
                {{ task.data.STATUS._value }}
              </label>
            </div>
          </div>
          <div class="add-tasks__controls">
            <ButtonIcon
              v-show="!checkTaskHistory(task.id)"
              icon="Check"
              title="Add"
              :loading="loadingTasksButtons"
              big
              success
              @click="onAddTaskToPlan(task.id, task.history)"
            />
            <ButtonIcon
              v-show="checkTaskHistory(task.id)"
              icon="XMark"
              title="Remove"
              :loading="loadingTasksButtons"
              big
              warning
              @click="onRemoveTaskFromPlan(task.id)"
            />
            <ButtonIcon
              icon="Pencil"
              title="Edit"
              big
              info
            />
            <ButtonIcon
              icon="Trash"
              title="Delete"
              big
              danger
            />
          </div>
        </li>
      </ul>
    </template>
  </TaskAreaComponent>
</template>

<script setup>
import { ref, inject } from 'vue'
import dayjs from 'dayjs'
import { deleteFromArray } from '@/utils/index.js' 

import { useRoute } from 'vue-router'
import { useTask } from '@/libs/task'

import TaskAreaComponent from '@/components/tasks/TaskAreaComponent.vue'
import ButtonIcon from '@/components/UI/ButtonIcon.vue'

const $route = useRoute()
const $task = useTask()
const $bus = inject('bus')

const taskList = ref([])
let loadingTasksButtons = ref(false)

const fetchTaskList = () => {
  $task
    .fetchUncompletedTasks()
    .then(result => {
      taskList.value = result
    })
}

fetchTaskList()

const checkTaskHistory = (id) => {
  const task = taskList.value
    .find(task => task.id === id)

  return (task.history.find(item => item === dayjs($route.params.date).format('YYYY-MM-DD')))
}

const onAddTaskToPlan = (id, history) => {
  loadingTasksButtons.value = true

  $task
    .addTaskToPlan({
      id,
      history: [
        ...history,
        dayjs($route.params.date).format('YYYY-MM-DD')
      ]
    })
    .then(data => {
      if (data) {
        loadingTasksButtons.value = false
        fetchTaskList()
        $bus.emit('updatedTaskList')
      }
    })
}

const onRemoveTaskFromPlan = (id) => {
  loadingTasksButtons.value = true

  const task = taskList.value
    .find(task => task.id === id)

  $task
    .addTaskToPlan({
      id,
      history: deleteFromArray(
        task.history,
        dayjs($route.params.date).format('YYYY-MM-DD')
      )
    })
    .then(data => {
      if (data) {
        loadingTasksButtons.value = false
        fetchTaskList()
        $bus.emit('updatedTaskList')
      }
    })
}

$bus.on('updatedUncompletedTasks', fetchTaskList)
</script>

<style lang="scss">
.add-tasks__item {
  display: flex;
  justify-content: space-between;
  gap: var(--padding-inline);

  padding-inline: var(--padding-inline);
  padding-block: var(--padding-block);

  border: {
    width: 1px;
    style: solid;
    color: var(--border-color);
    radius: var(--border-radius);
  }

  transition: filter 0.3s;
  
  &:hover, &:focus {
    .add-tasks__controls {
      opacity: 1;
      transition: opacity 0.15s;
    }
  }
}

// Task content
.add-tasks__content {
  display: flex;
  flex-direction: column;
  gap: var(--padding-block);
  flex-shrink: 1;
}
.add-tasks__date {
  font-size: var(--font-size-xs);
  color: var(--text-disabled);
}
.add-tasks__title {
  font-size: var(--font-size-b);
  font-weight: 400;
  margin: 0;
}
.add-tasks__info {
  display: flex;
  gap: var(--padding-inline);
}
.add-tasks__priority {
  font-size: var(--font-size-m);
  margin: 0;
}
.add-tasks__status {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  background-color: var(--success);
  border-radius: var(--border-radius);

  font-size: var(--font-size-xs);
  color: var(--background);
}

// Task controls
.add-tasks__controls {
  display: flex;
  align-items: center;
  gap: var(--padding-inline);
  flex-shrink: 0;

  opacity: 0;

  transition: opacity 0.3s;
}
</style>