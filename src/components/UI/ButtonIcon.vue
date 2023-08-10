<template>
  <button
    class="button-icon"
    :class="className"
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
  }
})

const Icon = computed(() => {
  return Icons[`${props.icon}Icon`]
})

const className = computed(() => {
  if (props.medium) {
    return 'button-icon--medium'
  }

  if (props.big) {
    return 'button-icon--big'
  }

  return ''
})

const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
.button-icon {
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
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
</style>