<template>
  <div 
    class="alert"
    :class="className"
  >
    <ExclamationCircleIcon class="alert__icon"/>

    <p class="alert__text">
      <slot></slot>
    </p>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import { computed, defineProps } from 'vue';

const props = defineProps({
  neutral: {
    type: Boolean,
    required: false,
    default: false,
  },

  info: {
    type: Boolean,
    required: false,
    default: false,
  },

  danger: {
    type: Boolean,
    required: false,
    default: false,
  },

  success: {
    type: Boolean,
    required: false,
    default: false,
  },

  warning: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const className = computed(() => {
  let className = ''

  if (props.neutral) {
    className += ' alert--neutral'
  }

  if (props.info) {
    className += ' alert--info'
  }

  if (props.warning) {
    className += ' alert--warning'
  }

  if (props.danger) {
    className += ' alert--danger'
  }

  if (props.success) {
    className += ' alert--success'
  }

  if (props.loading) { 
    className += ' alert--loading'
  }

  return className
})
</script>

<style lang="scss">
.alert {
  display: flex;
  gap: var(--padding-inline);
  
  width: 100%;
  
  padding-inline: var(--padding-inline);
  padding-block: var(--padding-block);

  border: {
    width: 1px;
    style: solid;
    radius: var(--border-radius);
  }
}
.alert--neutral {
  background-color: color-mix(in srgb, var(--neutral) 50%, white);
  color: var(--neutral);
}
.alert--info {
  background-color: color-mix(in srgb, var(--info) 50%, white);
  color: var(--info);
}
.alert--warning {
  background-color: color-mix(in srgb, var(--warning) 50%, white);
  color: var(--warning);
}
.alert--danger {
  background-color: color-mix(in srgb, var(--danger) 50%, white);
  color: var(--danger);
}
.alert--success {
  background-color: color-mix(in srgb, var(--success) 50%, white);
  color: var(--success);
}

.alert__icon {
  flex-shrink: 0;
  
  width: var(--icon-size-big);
  height: var(--icon-size-big);
}

.alert__text {
  font-size: var(--font-size-m);
  margin: 0;
}
</style>