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
        <li
          v-for="(task, i) in tasksList"
          :key="`task-${i}`"
          class="task"
        >
          <!-- <pre>{{ task }}</pre> -->
          <div class="task__content">
            <h4 class="task__title">
              <strong>{{ task.data.TASK_NUMBER._value }}:</strong> 
              {{ task.data.NAME._value }}
            </h4>

            <ul class="task__fieldset">
              <li class="task__field">
                <strong>Приоритет:</strong>
                {{ task.data.PRIORITY._value }}
              </li>
              <li class="task__field">
                {{ task.data.STATUS._value }}
              </li>
            </ul>
          </div>

          <div class="task__controls">
            <ButtonIcon
              icon="XMark"
              title="Remove"
              medium
              warning
              class="task__button"
              @click="onRemoveTask(task.id)"
            />
            <ButtonIcon
              icon="Pencil"
              title="Edit"
              medium
              info
              class="task__button"
            />
            <ButtonIcon
              icon="Trash"
              title="Delete"
              medium
              danger
              class="task__button"
            />
          </div>
        </li>
      </ul>

      <p v-else>
        No tasks...
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, defineProps, watchEffect, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTask } from '@/libs/task'
import { deleteFromArray } from '@/utils';

import Dropdown from '@/components/UI/Dropdown'
import ButtonIcon from '@/components/UI/ButtonIcon'
import dayjs from 'dayjs';

const $router = useRouter()
const $route = useRoute()
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

const onRemoveTask = (id) => {
  const task = tasksList.value
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
          fetchTasks()
          $bus.emit('updatedUncompletedTasks')
        }
      })
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
  display: flex;
  flex-direction: column;
  gap: var(--padding-block);
  flex-grow: 1;
  overflow-y: auto;
}

// Task
.plan-tasks-list {
  .task {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: calc(var(--padding-inline) / 2);

    border-radius: var(--border-radius);
    background-color: var(--background);
    filter: brightness(1.2);

    padding-block: calc(var(--padding-block) / 2);
    padding-inline: calc(var(--padding-inline) / 2);

    &:hover {
      .task__controls {
        display: flex;
      }
    }
  }
  .task__content {
    display: flex;
    flex-direction: column;
    gap: calc(var(--padding-block) / 2);
  }
  .task__title {
    font-size: var(--font-size-s);
    font-weight: 400;
    margin: 0;
  }
  .task__fieldset {
    display: flex;
    flex-direction: column;
    gap: calc(var(--padding-block) / 2);
  }
  .task__field {
    font-size: var(--font-size-xs);
  }
  .task__controls {
    display: none;
    justify-content: space-between;
    gap: calc(var(--padding-inline) / 2);

    width: 100%;
  }
  .task__button {
    width: 100%;
  }
}
</style>