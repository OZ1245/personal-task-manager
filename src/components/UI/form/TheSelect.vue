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

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import dayjs from 'dayjs'
import TheInput from '@/components/UI/form/TheInput.vue'

interface IOption {
  [ key: string ]: any,
  title: string,
  value: number,
}

const props = withDefaults(defineProps<{
  modelValue: any,
  label?: string,
  options?: IOption[] | any,
  placeholder?: string,
  maxCount?: number,
  selectId?: string,
  horizontal?: boolean,
}>(), {
  modelValue: null,
  label: '',
  options: () => [],
  placeholder: '',
  maxCount: 6,
  selectId: '',
  horizontal: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: number ): void,
}>()

const showOptions = ref<boolean>(false)
const selectedOptionTitle = ref<any>(null)

onMounted(() => {
  if (props.modelValue) {
    selectedOptionTitle.value = props
      .options
      .find((option: IOption) => option.value === props.modelValue)
      .title
  }
})

const selectId = computed((): string => {
  if (props.selectId) {
    return props.selectId
  }
  
  return `select-${dayjs().valueOf()}${Math.floor(Math.random())}`
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
] as any

const onOpenOptions = () => {
  showOptions.value = true
}

const onCloseOptions = () => {
  console.log('--- onCloseOptions ---')
  showOptions.value = false
}

const onSelect = (option: IOption) => {
  console.log('--- onSelect ---')
  console.log('option:', option)

  emits('update:modelValue', option.value)
  selectedOptionTitle.value = option.title
  onCloseOptions()
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

.select__input {
  cursor: pointer;
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