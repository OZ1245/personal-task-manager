<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <transition name="modal-animation">
    <div 
      v-show="props.modelValue" 
      class="modal"
    >
      <div class="modal__backdrop"></div>

      <transition name="modal-animation-inner">
        <div class="modal__inner">
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

              <button 
                type="button"
                @click="onClose()"
              >
                <XMarkIcon 
                  v-if="showCloseIcon"
                  class="modal__close-icon"
                />
              </button>
            </div>
          </slot>

          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
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
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
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
  max-width: 640px;
  width: 80%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  padding: 64px 16px;

  i {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: crimson;
    }
  }
}
</style>