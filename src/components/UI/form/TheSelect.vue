<template>
  <div 
    class="select"
    :class="{ 'select--horizontal' : props.horizontal }"
    v-on-click-outside="onClickOutside"
  >
    <label 
      v-if="props.label"
      :for="selectId"
      class="select__label"
    >
      {{ props.label }}
    </label>

    <div class="select__control" ref="contol">
      <TheInput
        v-model="selectedOptionTitle"
        readonly
        :inputType="`selector-${showOptions ? 'opened' : 'closed'}`"
        :inputId="selectId"
        :active="showOptions"
        class="select__input"
        @click="onOpenOptions"
      />

      <ul
        v-show="showOptions" 
        class="select__options"
      >
        <li
          v-if="props.placeholder" 
          class="select__option"
        >
          {{ props.placeholder }}
        </li>
        <li
          v-for="(option, i) in props.options"
          :key="`option-${i}`"
          class="select__option"
          :class="{ 'select__option--selected' : option.value === modelValue }"
          @click="onSelect(option)"
        >
          {{ option.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, computed } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import dayjs from 'dayjs'
import TheInput from '@/components/UI/form/TheInput.vue'

const emits = defineEmits(['update:modelValue', 'select'])

const props = defineProps({
  modelValue: {
    type: [ Number, String ],
    required: false,
    default: () => {}
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
  options: {
    type: Array,
    required: false,
    default: () => []
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  maxCount: {
    type: Number,
    required: false,
    default: 6
  },
  selectId: {
    type: String,
    required: false,
    default: ''
  },
  horizontal: {
    type: Boolean,
    required: false,
    default: false
  }
})

const showOptions = ref(false)
const selectedOptionTitle = ref(props.options[0].title)

const selectId = computed(() => {
  if (props.inputId) {
    return props.inputId
  }
  
  return `select-${dayjs().valueOf()}${parseInt(Math.random())}`
})

const onClickOutside = [
  () => {
    onCloseOptions()
  },
  {
    ignore: [
      'contol'
    ]
  }
]

const onOpenOptions = () => {
  showOptions.value = true
}

const onCloseOptions = () => {
  console.log('--- onCloseOptions ---')
  showOptions.value = false
}

const onSelect = (option) => {
  console.log('--- onSelect ---')
  console.log('option:', option)

  emits('update:modelValue', option.value)
}

</script>

<style lang="scss">
.select {
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding-block) / 2);

  height: auto;
}
.select--horizontal {
  flex-direction: row;
  align-items: center;
  gap: calc(var(--padding-inline) / 2);

  width: 100%;
}
.select--horizontal .select__label {
  flex-shrink: 0;
}

.select__label {
  font-size: var(--font-size-xs);
}

.select__control {
  position: relative;
  width: 100%;
}

:deep(.input__input) {
  cursor: pointer;
}

.select__options {
  position: absolute;
  top: 100%;
  left: 0;

  display: block;
  width: 100%;
  max-height: calc((40px * v-bind('props.maxCount')) + 2px);
  overflow-y: auto;

  background-color: var(--text-base);
  border: {
    width: 1px;
    style: solid;
    color: var(--background);
    radius: var(--border-radius);
  };
}

.select__option {
  display: flex;
  align-items: center;

  height: 40px;
  padding-inline: calc(var(--padding-inline) / 2);

  font-size: var(--font-size-s);
  color: var(--background);

  cursor: pointer;

  &:hover:not(:disabled),
  &:hover:not(.select__option--selected) {
    background-color: var(--accent);
    color: var(--text-base);
  }
}
.select__option--selected {
  color: var(--accent);
}
</style>