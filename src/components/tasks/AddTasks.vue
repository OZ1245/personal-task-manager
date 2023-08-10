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
import dayjs from 'dayjs';

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
        // FIXME: Ввести константы для полей. Не брать названия за основу.
        return {
          ...item,
          data: [
            {
              name: 'Дата создания',
              value: dayjs(item.created).format('LL')
            },
            ...item.data
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
          ]
        }
      })
  })
</script>