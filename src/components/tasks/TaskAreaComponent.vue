<template>
  <div class="task-area-component">
    <div class="task-area-component__header">
      <slot name="header">
        <h3 class="task-area-component__title">{{ props.title }}</h3>
      </slot>
    </div>

    <div class="task-area-component__body">
      <slot name="body"></slot>
    </div>

    <div class="task-area-component__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
})
</script>

<style lang="scss">
.task-area-component__header {
  padding-inline: var(--padding-inline);
  padding-block: var(--padding-block);
}
.task-area-component__body {
  overflow-y: auto;
  flex-grow: 1;
  padding-inline: var(--padding-inline);
}
.task-area-component__footer {
  padding-inline: var(--padding-inline);
  padding-block: var(--padding-block);
}
</style>