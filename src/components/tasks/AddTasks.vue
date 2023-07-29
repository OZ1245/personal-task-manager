<template>
  <TaskAreaComponent
    title="Add tasks to plan"
    class="add-tasks"
  >
    <template #body>
      <!-- <pre>{{ taskList }}</pre> -->
      <ul
        v-if="taskList.length" 
        class="add-tasks__list"
      >
        <li
          v-for="(task, i) in taskList"
          :key="`task-${i}`"
          class="add-tasks__item"
        >
          <pre>{{ task }}</pre>
          <ul>
            <li
              v-for="(field, j) in task.data"
              :key="`field-${j}`"
              class="add-task__field"
            >
              <strong>{{ field.name }}</strong>
              {{ field.value }}
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </TaskAreaComponent>
</template>

<script setup>
import { ref } from 'vue';

import { useTask } from '@/libs/task';

import TaskAreaComponent from '@/components/tasks/TaskAreaComponent.vue';

const $task = useTask()
const taskList = ref([])

$task
  .fetchUncompletedTasks()
  .then(result => {
    // console.log('result:', result)
    taskList.value = result
      .map(item => {
        console.log('result:', result)
        return {
          ...item,
          data: item.data
            .reduce((result, j) => {
              if ([
                'Название',
                'Номер задачи',
                'Приоритет',
                'Статус',
              ].includes(j.name)) {
                // console.log('item:', item)
                return [
                  ...result,
                  j
                ]
              } else {
                return result
              }
            }, [])
        }
      })
  })
</script>