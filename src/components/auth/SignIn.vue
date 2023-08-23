<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <TheInput
    v-model="email"
    label="Email"
    inputType="email"
    autocomplete="email"
  />

  <TheInput
    v-model="password"
    label="Password"
    inputType="password"
    autocomplete="current-password"
  />
  
  <TheButton 
    type="button"
    width="100%"
    :disabled="!validate"
    medium
    success
    :loading="props.loading"
    @click="onSubmit"
  >
    Sign Up
  </TheButton>
</template>

<script setup>
import { ref, defineEmits, computed, defineProps } from "vue"

import TheInput from '@/components/UI/form/TheInput' 
import TheButton from '@/components/UI/TheButton'

const emits = defineEmits(['form-submit'])

const email = ref('')
const password = ref('')

const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
})

const validate = computed(() => {
  // TODO: Валидация
  if (!email.value.length) {
    return false
  }

  if (!password.value.length) {
    return false
  }

  return true
})

const onSubmit = () => emits('form-submit', { email, password })
</script>