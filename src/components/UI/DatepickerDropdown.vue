<template>
  <div class="datepicker-dropdown">
    <button 
      type="button"
      ref="dropdownTrigger"
      @click="show = !show"
    >
      <ChevronDownIcon class="datepicker-dropdown__trigger-icon"/>
    </button>

    <Dropdown
      v-model="show"
      trigger-ref-name="dropdownTrigger"
    >
      <VueDatepicker 
        v-model="date"
        inline 
        auto-apply
        :enable-time-picker="false"
        @update:model-value="onChangeDate($event)"
      />
    </Dropdown>  
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import VueDatepicker from '@vuepic/vue-datepicker'
import Dropdown from '@/components/UI/Dropdown'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: [ Date, String ],
    required: false,
    default: new Date()
  }
})

const date = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])
const show = ref(false)

const onChangeDate = (event) => {
  show.value = false
  emit('update:modelValue', event)
}
</script>

<style lang="scss">
.datepicker-dropdown {
  position: relative;
}
.datepicker-dropdown__trigger-icon {
  width: var(--icon-size);
  height: var(--icon-size);
  color: var(--background);
}
.datepicker-dropdown .dropdown {
  width: auto;
  height: auto;
  max-height: initial;
  padding: 0;
  border: none;
}
</style>