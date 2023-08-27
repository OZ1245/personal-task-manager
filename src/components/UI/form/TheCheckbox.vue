<template>
  <div 
    class="checkbox"
    @click="emits('update:modelValue', !modelValue)"
  >
    <div 
      class="checkbox__check"
    >
      <CheckIcon
        v-show="modelValue"
        class="checkbox__check-in"
      />
    </div>

    <label class="checkbox__label">
      {{ props.label }}
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/outline';

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: false,
    default: false
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
})
</script>

<style lang="scss">
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--padding-inline) / 2);

  height: 40px;

  cursor: pointer;
}
.checkbox__check {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 20px;
  height: 20px;
  border: {
    width: 1px;
    style: solid;
    color: var(--text-base);
    // radius: 50%;
    radius: var(--border-radius);
  }
}

.checkbox__check-in,
.checkbox__check-out {
  width: var(--icon-size);
  height: var(--icon-size);

  color: var(--accent);
}

.checkbox__label {
  flex-shrink: 0;

  font-size: var(--font-size-xs);

  cursor: pointer;
}
</style>