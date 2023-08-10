<template>
  <div class="datepicker-dropdown">
    <ButtonIcon 
      :icon="buttonIcon" 
      ref="dropdownTrigger"
      big
      class="datepicker-dropdown__trigger"
      @click="show = !show"
    />

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
import { ref, defineEmits, defineProps, computed } from 'vue';
import VueDatepicker from '@vuepic/vue-datepicker'
import Dropdown from '@/components/UI/Dropdown'
import ButtonIcon from '@/components/UI/ButtonIcon.vue';

const props = defineProps({
  modelValue: {
    type: [ Date, String ],
    required: false,
    default: new Date()
  }
})

const date = ref(props.modelValue)
const show = ref(false)

const buttonIcon = computed(() => (!show.value ? 'ChevronDown' : 'ChevronUp'))

const emit = defineEmits(['update:modelValue'])

const onChangeDate = (event) => {
  show.value = false
  emit('update:modelValue', event)
}
</script>

<style lang="scss">
.datepicker-dropdown {
  position: relative;
}
.datepicker-dropdown__trigger {
  color: var(--text-base);
}
.datepicker-dropdown .dropdown {
  width: auto;
  height: auto;
  max-height: initial;
  padding: 0;
  border: none;
}
</style>