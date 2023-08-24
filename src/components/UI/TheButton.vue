<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    :type="props.type"
    class="button"
    :class="className"
    :disabled="props.loading"
    @click="emit('click')"
  >
    <ArrowPathIcon v-if="props.loading"/>

    <slot v-else></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

import { ArrowPathIcon } from '@heroicons/vue/24/outline'

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
  accent: {
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

  if (props.accent) {
    className += ' button--accent'
  }

  if (props.loading) { 
    className += ' button--loading'
  }

  return className
})

const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
@import '/src/scss/mixins';

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
.button--success,
.button--accent {
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
  @include modify-background(var(--neutral), 80%);

  background-color: var(--neutral);
  color: var(--background);

  &:hover:not(:disabled) {
    color: var(--background);
  }
}
.button--info {
  @include modify-background(var(--info), 80%);

  background-color: var(--info);
  color: var(--text-base);

  &:hover:not(:disabled) {
    color: var(--text-base);
  }
}
.button--warning {
  @include modify-background(var(--warning), 80%);

  background-color: var(--warning);
  color: var(--background);

  &:hover:not(:disabled) {
    color: var(--background);
  }
}
.button--danger {
  @include modify-background(var(--danger), 80%);

  background-color: var(--danger);
  color: var(--text-base);

  &:hover:not(:disabled) {
    color: var(--text-base);
  }
}
.button--success {
  @include modify-background(var(--success), 80%);

  background-color: var(--success);
  color: var(--text-base);

  &:hover:not(:disabled) {
    color: var(--text-base);
  }
}

.button--accent {
  @include modify-background(var(--accent), 80%);

  background-color: var(--accent);
  color: var(--text-base);

  &:hover:not(:disabled) {
    color: var(--text-base);
  }
}

.button--loading {
  color: var(--text-base) !important;
}
.button--loading svg {
  @include circle-animation(.8s);

  width: var(--icon-size-big);
  height: var(--icon-size-big);
}
</style>