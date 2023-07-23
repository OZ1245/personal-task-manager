<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ul
    v-if="props.modelValue" 
    class="dropdown"
    :class="[ position ? `dropdown--${position}` : false ]"
    v-on-click-outside="onClickOutside"
  >
    <li
      v-for="(item, i) in props.items"
      :key="`item-${i}`"
      class="dropdown__item"
      :class="[
        { 'dropdown__item--link' : item.type && item.type.includes('link') },
        { 'dropdown__item--disabled': item.type && item.type.includes('disabled') },
      ]"
      @click="onClick(item)"
    >
      <slot name="items" :item="{ item }">
        {{ item.name }}
      </slot>
    </li>

    <slot></slot>
  </ul>
</template>

<script setup>
import { defineProps, computed, defineEmits, getCurrentInstance } from 'vue';
import { vOnClickOutside } from '@vueuse/components'

const instance = getCurrentInstance()

const props = defineProps({
  modelValue: {
    type: Boolean,
    requered: true,
    default: false
  },
  items: {
    type: Array,
    requered: true
  },
  top: {
    type: Boolean,
    requered: false,
    default: false
  },
  right: {
    type: Boolean,
    requered: false,
    default: false
  },
  bottom: {
    type: Boolean,
    requered: false,
    default: true
  },
  left: {
    type: Boolean,
    requered: false,
    default: false
  },
  triggerRefName: {
    type: String,
    requered: true
  }
})

const position = computed(() => {
  if (props.top) {
    return 'top'
  }

  if (props.right) {
    return 'right'
  }

  if (props.bottom) {
    return 'bottom'
  }

  if (props.left) {
    return 'left'
  }

  if (props.right && props.top) {
    return 'right-top'
  }
  
  if (props.left && props.top) {
    return 'left-top'
  }

  return 'bottom'
})

const emit = defineEmits(['click', 'update:modelValue'])

const onClick = (data) => {
  emit('click', data);
}
    
const onClose = () => {
  emit('update:modelValue', false);
}

const onClickOutside = [
  () => {
    onClose()
  },
  {
    ignore: [
      instance.parent.refs[props.triggerRefName]
    ]
  }
]
</script>

<style lang="scss">
.dropdown {
  position: absolute;
  z-index: 2;

  max-height: 200px;
  width: 200px;
  overflow-y: auto;

  padding: var(--inner-padding-inline) var(--inner-padding-block);
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);

  cursor: default;

  &--top {
    top: 0;
    left: 0;
    transform: translate(-1px, calc(-100% - 5px));
  }

  &--right {
    top: 0;
    left: 100%;
    transform: translate(5px, -1px);
  }

  &--bottom {
    top: 100%;
    left: 0;
    transform: translate(-1px, 5px);
  }

  &--left {
    top: 0;
    left: 0;
    transform: translate(calc(-100% - 5px), -1px);
  }

  &--right-top {
    top: 100%;
    left: 100%;
    transform: translate(5px, calc(-100% + 1px));
  }

  &--left-top {
    top: 100%;
    left: 0;
    transform: translate(calc(-100% - 5px), calc(-100% + 1px));
  }
}

.dropdown__item {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: left;

  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &--link {
    color: var(--accent);

    &:hover {
      color: var(--contrast);
      cursor: pointer;
    }
  }

  &--disabled {
    color: var(--text-disabled);

    cursor: not-allowed;
  }
}
</style>