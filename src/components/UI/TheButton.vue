<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    :type="props.type"
    class="button"
    :class="className"
    :disabled="loading"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'button'
  },
  medium: {
    type: Boolean,
    required: false,
    default: false
  },
  big: {
    type: Boolean,
    required: false,
    default: false
  },
  neutral: {
    type: Boolean,
    required: false,
    default: false
  },
  info: {
    type: Boolean,
    required: false,
    default: false
  },
  warning: {
    type: Boolean,
    required: false,
    default: false
  },
  danger: {
    type: Boolean,
    required: false,
    default: false
  },
  success: {
    type: Boolean,
    required: false,
    default: false
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  width: {
    type: String,
    required: false,
    default: 'auto'
  },
})

const className = computed(() => {
  let className = ''

  if (props.medium) {
    className += ' button--medium'
  }

  if (props.big) {
    className += ' button--big'
  }

  if (props.neutral) {
    className += ' button--neutral'
  }

  if (props.info) {
    className += ' button--info'
  }

  if (props.warning) {
    className += ' button--warning'
  }

  if (props.danger) {
    className += ' button--danger'
  }

  if (props.success) {
    className += ' button--success'
  }

  if (props.loading) { 
    className += ' button--loading'
  }

  return className
})

const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: v-bind('props.width');

  background: none;
  border: none;
  padding: 0;

  cursor: pointer;
  
  color: var(--text-base);

  &:disabled {
    color: var(--text-disabled);
  }

  &:hover:not(:disabled) {
    color: var(--accent);
  }
}

.button--medium  {
  height: 40px;
}
.button--big  {
  height: 40px;
}

.button--neutral,
.button--info,
.button--warning,
.button--danger,
.button--success {
  padding: 4px;
  border-radius: var(--border-radius);

  &:disabled {
    background-color: var(--neutral);
  }

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.8);
  }
}
.button--neutral {
  background-color: var(--neutral);
  color: var(--background);

  &:hover:not(:disabled) {
    color: var(--background);
  }
}
.button--info {
  background-color: var(--info);
  color: var(--text-base);

  &:hover:not(:disabled) {
    color: var(--text-base);
  }
}
.button--warning {
  background-color: var(--warning);
  color: var(--background);

  &:hover:not(:disabled) {
    color: var(--background);
  }
}
.button--danger {
  background-color: var(--danger);
  color: var(--text-base);

  &:hover:not(:disabled) {
    color: var(--text-base);
  }
}
.button--success {
  background-color: var(--success);
  color: var(--text-base);

  &:hover:not(:disabled) {
    color: var(--text-base);
  }
}

.button--loading {
  color: var(--text-base) !important;
}
.button--loading svg {
  animation: circle .8s linear infinite;
}

@keyframes circle {
  0%{
    transform:rotate(0deg);
  
  }
  100%{
    transform:rotate(360deg);
  }
}
</style>