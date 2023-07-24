<template>
  <Modal 
    v-model="show"
    max-width="800px"
    top
    title="Добавить задачу в план"
    @close="onClose()"
  >
    <template #body>
      <div class="tasks-list">
        TODO
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import Modal from '@/components/UI/Modal.vue'

const show = computed(() => props.modelValue)

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const onClose = () => {
  emit('update:modelValue', false)
}
</script>