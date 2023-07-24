<template>
  <Modal 
    v-model="show"
    @close="onClose()"
  >
    <div class="tasks-list">
      TODO
    </div>
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