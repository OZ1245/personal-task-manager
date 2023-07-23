<template>
  <aside class="sidebar">
    <div class="sidebar__datepicker">
      Today
      <button type="button">
        <ChevronDownIcon class="sidebar__change-icon"/>
      </button>
    </div>

    <div class="sidebar__task-list">
      <PlanTasksList/>
    </div>
  </aside>
</template>

<script setup>
import PlanTasksList from '@/components/tasks/PlanTasksList';
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
</script>

<style lang="scss">
.sidebar {
  width: 250px;
  border-right: 1px solid var(--border);
  padding: var(--inner-padding-block) var(--inner-padding-inline);
}
.sidebar__change-icon {
  width: var(--icon-size);
  height: var(--icon-size);
  color: var(--background);
}
</style>