<template>
  <aside class="sidebar">
    <div class="sidebar__datepicker">
      {{ $dayjs(date).format('LL') }}

      <DatepickerDropdown
        v-model="date"
        @update:model-value="onChangeDate($event)"
      />
    </div>

    <div class="sidebar__task-list">
      <PlanTasksList 
        :date="formattedDate"
      />
    </div>
  </aside>
</template>

<script setup>
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';

import PlanTasksList from '@/components/tasks/PlanTasksList';
import DatepickerDropdown from '@/components/UI/DatepickerDropdown'

const $router = useRouter()
const $route = useRoute()

const date = ref(dayjs())

if ($route.params.date) {
  date.value = $route.params.date
}

const formattedDate = computed(() => {
  return dayjs(date.value).format('YYYY-MM-DD')
})

const onChangeDate = (event) => {
  $router.push({
    name: 'ProjectWorkspace',
    params: {
      date: dayjs(event).format('YYYY-MM-DD')
    }
  })
}
</script>

<style lang="scss">
.sidebar {
  width: 250px;
  border-right: 1px solid var(--border);
  padding: var(--inner-padding-block) var(--inner-padding-inline);
}
.sidebar__datepicker {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>