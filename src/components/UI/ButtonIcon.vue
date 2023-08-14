<template>
  <button
    class="button-icon"
    :class="className"
    :disabled="loading"
    @click="emit('click')"
  >
    <component 
      :is="Icon" 
      class="button-icon__icon"
    />
  </button>
</template>

<script setup>
import * as Icons from '@heroicons/vue/24/outline'
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'button'
  },
  icon: {
    type: String,
    required: true,
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
  }
})

const Icon = computed(() => {
  if (props.loading) {
    return Icons['ArrowPathIcon']
  }

  return Icons[`${props.icon}Icon`]
})

const className = computed(() => {
  let className = ''

  if (props.medium) {
    className += ' button-icon--medium'
  }

  if (props.big) {
    className += ' button-icon--big'
  }

  if (props.neutral) {
    className += ' button-icon--neutral'
  }

  if (props.info) {
    className += ' button-icon--info'
  }

  if (props.warning) {
    className += ' button-icon--warning'
  }

  if (props.danger) {
    className += ' button-icon--danger'
  }

  if (props.success) {
    className += ' button-icon--success'
  }

  if (props.loading) { 
    className += ' button-icon--loading'
  }

  return className
})

const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
.button-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;

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

.button-icon--medium .button-icon__icon  {
  width: var(--icon-size);
  height: var(--icon-size);
}
.button-icon--big .button-icon__icon  {
  width: var(--icon-size-big);
  height: var(--icon-size-big);
}

.button-icon--neutral,
.button-icon--info,
.button-icon--warning,
.button-icon--danger,
.button-icon--success {
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
.button-icon--neutral {
  background-color: var(--neutral);
  color: var(--background);

  &:hover:not(:disabled) {
    color: var(--background);
  }
}
.button-icon--info {
  background-color: var(--info);
  color: var(--text-base);

  &:hover:not(:disabled) {
    color: var(--text-base);
  }
}
.button-icon--warning {
  background-color: var(--warning);
  color: var(--background);

  &:hover:not(:disabled) {
    color: var(--background);
  }
}
.button-icon--danger {
  background-color: var(--danger);
  color: var(--text-base);

  &:hover:not(:disabled) {
    color: var(--text-base);
  }
}
.button-icon--success {
  background-color: var(--success);
  color: var(--text-base);

  &:hover:not(:disabled) {
    color: var(--text-base);
  }
}

.button-icon--loading {
  color: var(--text-base) !important;
}
.button-icon--loading svg {
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