<template>
  <form>
    <label for="">Name</label>
    <input type="text" v-model="form.name">

    <hr>

    <h2>Settings</h2>

    <h3>Fields</h3>

    <template v-if="form.settings?.fields.length">
      <div v-for="(field, i) in form.settings.fields" :key="`settings-field-${i}`">
        <label>Field type</label>
        <select 
          v-model="field.field_type_id"
          @change="onSelectFieldType(field.id)"
        >
          <option 
            v-for="(type, j) in fieldTypes" 
            :key="`field-type-${j}`"
            :value="type.id"
          >
            {{  type.name[userData.settings.language || 'en'] }}
          </option>
        </select>

        <template v-if="field.field_type_id">
          <input type="hidden" v-model="field.id">

          <label for="">Name</label>
          <input type="text" v-model="field.name">
          
          <label for="">Editable</label>
          <input type="checkbox" v-model="field.editable">
          
          <label for="">Multiply</label>
          <input type="checkbox" v-model="field.multipty">
          
          <label for="">Default value</label>
          <input
            v-if="getFiledCode(field.field_type_id) === 'text_input'" 
            type="text" 
            v-model="field.default_value"
          >
          <textarea
            v-if="getFiledCode(field.field_type_id) === 'text_area'" 
            row="3"
            v-model="field.default_value"
          />
        </template>

        <!-- <button type="button" @click="onRemoveField">Delete</button> -->
      </div>
    </template>
    <button type="button" @click="onAddField">Add field</button>
  </form>    
</template>

<script setup>
import * as dayjs from 'dayjs'
import * as _ from 'lodash'
import { defineProps, reactive, computed, ref } from 'vue'

import { useUser } from '@/libs/user'
import { useFieldType } from '@/libs/fieldType'

const $user = useUser()
const $fieldType = useFieldType()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const form = reactive(props.data)
const fieldTypes = ref([])
const defaultData = {
  name: null,
  editable: true,
  multipty: false,
  default_value: null,
  rules: null
}

const userData = computed(() => $user.getUser())

$fieldType
  .fetchFieldTypes()
  .then(result => {
    fieldTypes.value = result
  })

const onAddField = () => {
  form.settings.fields.push({
    ...defaultData,
    id: dayjs(new Date()).valueOf(),
    field_type_id: 1,
  })
}

const getFiledCode = (fieldId) => {
  return fieldTypes.value
    .find(field => {
      return field.id === fieldId
    })?.code || null
}

const onSelectFieldType = (fieldId) => {
  const index = _.findIndex(form.settings.fields, ['id', fieldId])

  console.log('index:', index)

  form.settings.fields[index] = {
    ...form.settings.fields[index],
    ...defaultData
  }
}
</script>