<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <transition name="modal-animation">
    <div 
      v-show="props.modelValue" 
      class="modal"
      :class="[
        { 'modal--top': position === 'top' },
        { 'modal--center': position === 'center' },
      ]"
    >
      <div class="modal__backdrop"></div>

      <transition name="modal-animation-inner">
        <div class="modal__inner">
          <!-- Default -->
          <slot></slot>

          <!-- Header -->
          <slot name="header">
            <div
              v-if="props.showHeader" 
              class="modal__header"
            >
              <h2
                v-if="props.title" 
                class="modal__title"
              >
                {{ title }}
              </h2>

              <XMarkIcon 
                v-if="showCloseIcon"
                class="modal__close-icon"
                @click="onClose()"
              />
            </div>
          </slot>

          <!-- Body -->
          <div class="modal__body">
            <slot name="body"></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    required: false,
    default: true
  },
  showCloseIcon: {
    type: Boolean,
    required: false,
    default: true
  },
  title: {
    type: String,
    required: false,
    default: ''
  },
  maxWidth: {
    type: String,
    required: false,
    default: '640px'
  },
  top: {
    type: Boolean,
    required: false,
    default: false
  },
  center: {
    type: Boolean,
    required: false,
    default: true
  }
})

const position = computed(() => {
  if (props.top) {
    return 'top'
  }

  if (props.center) {
    return 'center'
  }

  return 'center'
})

const emit = defineEmits(['close', 'update:modelValue'])

const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style lang="scss" scoped>
// TODO:
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 1;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;

  padding: 50px;

  &--top {
    align-items: flex-start;
  }

  &--center {
    align-items: center;
  }
}

.modal__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  opacity: 1;
}

.modal__inner {
  position: relative;
  max-width: v-bind(maxWidth);
  width: 100%;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  backdrop-filter: drop-shadow(0 0 15px back);
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding: var(--inner-padding-block) var(--inner-padding-inline);
}

.modal__close-icon {
  width: var(--icon-size-big);
  height: var(--icon-size-big);
  color: var(--text-base);
}

.modal__body {
  padding: var(--inner-padding-block) var(--inner-padding-inline);
}

</style>