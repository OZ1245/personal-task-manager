<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div 
    class="input"
    :class="{ 'input--horizontal': props.horizontal }"
  >
    <label 
      v-if="props.label.length" 
      :for="inputId"
      class="input__label"
    >
      {{ props.label }}
    </label>
    
    <div 
      class="input__control"
      :class="{ 'input__control--active' : props.active }"
    >
      <input
        :type="type"
        :value="modelValue"
        :id="inputId"
        ref="input"
        :autocomplete="props.autocomplete"
        :required="props.required"
        :readonly="props.readonly"
        class="input__input"
        @input="emits('update:modelValue', $event.target.value)"
      /> 

      <ButtonIcon
        v-if="showButton"
        :icon="icon"
        class="input__button"
        :class="buttonClassName"
        big
        @click="onProcessButtonClick"
      />
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { defineProps, defineEmits, computed, ref } from 'vue'

import ButtonIcon from '@/components/UI/ButtonIcon'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: false,
    default: ''
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
  inputType: {
    type: String,
    reqired: false,
    default: 'text'
  },
  inputId: {
    type: String,
    reqired: false,
    default: ''
  },
  autocomplete: {
    type: String,
    required: false,
    default: 'off'
  },
  width: {
    type: String,
    required: false,
    default: '100%'
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  horizontal: {
    type: Boolean,
    required: false,
    default: false
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false
  },
  active: {
    type: Boolean,
    required: false,
    default: false
  }
})

const showPassword = ref(false)

const type = computed(() => {
  if (props.inputType === 'password') {
    return (showPassword.value)
      ? 'text'
      : 'password'
  }

  return props.inputType
})

const inputId = computed(() => {
  if (props.inputId) {
    return props.inputId
  }
  
  return `input-${dayjs().valueOf()}${parseInt(Math.random())}`
})

const showButton = computed(() => {
  if (props.inputType === 'password') {
    return true
  }

  if (['selector-opened', 'selector-closed'].includes(props.inputType)) {
    return true
  }

  return false
})

const icon = computed(() => {
  if (props.inputType === 'password') {
    return (showPassword.value) 
      ? 'EyeSlash'
      : 'Eye'
  }

  if (props.inputType === 'selector-opened') {
    return 'ChevronUp'
  }

  if (props.inputType === 'selector-closed') {
    return 'ChevronDown'
  }

  return ''
})

const buttonClassName = computed(() => {
  if (props.inputType === 'password') {
    return 'input__button--eye'
  }

  return ''
})

const onProcessButtonClick = () => {
  if (props.inputType === 'password') {
    showPassword.value = !showPassword.value
  }
}
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding-block) / 2);

  height: auto;
}

.input--horizontal {
  flex-direction: row;
  align-items: center;
  gap: calc(var(--padding-inline) / 2);
}
.input--horizontal .input__label {
  flex-shrink: 0;
}

.input__label {
  font-size: var(--font-size-xs);
}

.input__control {
  display: flex;
  gap: calc(var(--padding-inline) / 2);

  width: v-bind('props.width');
  height: 40px;

  background: var(--text-base);
  border: {
    width: 1px;
    style: solid;
    color: var(--border);
    radius: var(--border-radius);
  }

  padding-inline: calc(var(--padding-inline) / 2);
  padding-block: calc(var(--padding-block) / 2);

  &:has(.input__input:focus),
  &:has(.input__input:focus-visible) {
    border-color: var(--accent);
    box-shadow: 0px 0px 5px 1px var(--accent);
  }
}

.input__control--active {
  border-color: var(--accent);
  box-shadow: 0px 0px 5px 1px var(--accent);
}

.input__input {
  flex-grow: 1;

  font-size: var(--font-size-s);
  color: var(--background);

  padding: 0;
  background-color: var(--text-base);
  border: none;
  
  &:focus-visible {
    outline: 0;
  }
}

.input__button {
  flex-shrink: 0;

  color: var(--background);
}
</style>