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
          <option value="null"></option>
          <option 
            v-for="(type, j) in fieldTypes" 
            :key="`field-type-${j}`"
            :value="type.id"
          >
            {{  $t(type.name) }}
          </option>
        </select>

        <br>

        <template v-if="field.field_type_id">
          <input type="hidden" v-model="field.id">

          <label for="">Name</label>
          <input type="text" v-model="field.name">

          <br>
          
          <label for="">Default value</label>
          <input
            v-if="getFiledCode(field.field_type_id) === 'INPUT_TEXT'" 
            type="text" 
            v-model="field.default_value"
          >

          <template v-if="getFiledCode(field.field_type_id) === 'TEXTAREA'">
            <textarea
              :rows="field.rows"
              v-model="field.default_value"
            />

            <br>

            Количество строк
            <input 
              type="number" 
              v-model="field.rows" 
              min="1" 
              max="25"
            />
          </template>

          <div v-if="getFiledCode(field.field_type_id) === 'CHECKBOX'">
            <!-- TODO: Если будет выбрано множественное, отображать несколько полей -->
            <input 
              type="checkbox"
              :id="`checkbox-${i}`" 
              :name="`checkbox-${i}`" 
              v-model="field.default_value"
            > 
            <label :for="`nested-item-${k}`">
              Выбрано
            </label>
          </div>

          <div v-if="getFiledCode(field.field_type_id) === 'SELECT_SIMPLE_TEXT'">
            <!-- TODO: search prop -->
            <template v-if="field.nested_items.length">
              <div 
                v-for="(item, k) in field.nested_items"
                :key="`nested-item-${k}`"
              >
                <input type="hidden" v-model="item.id">
                <input type="text" v-model="item.name"/>
                <input 
                  type="radio"
                  :id="`nested-item-${k}`" 
                  :name="`select-${field.id}`" 
                  v-model="item.default"
                > 
                <label :for="`nested-item-${k}`">
                  По-умолчанию
                </label>
                <button v-if="field.nested_items.length > 1" type="button">Удалить</button>
              </div>
            </template>
            <button type="button" @click="onAddNestedItem(i)">Добавить</button>
          </div>

          <div v-if="getFiledCode(field.field_type_id) === 'DATE'">
            <Datepicker
              v-if="!field.date_now"
              v-model="field.default_value"
            />
            <input 
              v-model="field.date_now"
              type="checkbox" 
              :name="`date-${i}`"
            >
            <label :for="`date-${i}`">Now()</label>
          </div>

          <br>
          
          <input type="checkbox" v-model="field.editable">
          <label for="">Editable</label>

          <br>
          
          <input type="checkbox" v-model="field.multipty">
          <label for="">Multiply</label>

          <br>
          
          <input type="checkbox" v-model="field.dayly">
          <label for="">Ежедневное</label>
        </template>

        <button type="button" @click="onRemoveField(field.id)">Delete field</button>
      </div>
    </template>
    <button type="button" @click="onAddField">Add field</button>
  </form>    
</template>

<script setup>
import dayjs from 'dayjs'
import * as _ from 'lodash'
import { deleteFromArray } from '@/utils/index.js' 
import { defineProps, reactive, ref } from 'vue'

import Datepicker from 'vue3-datepicker'

import { useFieldType } from '@/libs/fieldType'

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
  default_value: null,
  editable: true,
  multipty: false,
  dayly: false,
  rules: null,
  nested_items: [],
  rows: 3,
  search: false,
  date_now: false,
}
const defaultNestedItem = {
  name: null,
  default: false,
}

$fieldType
  .fetchFieldTypes()
  .then(result => {
    fieldTypes.value = result
  })

const onAddField = () => {
  form.settings.fields.push({
    ...defaultData,
    id: dayjs(new Date()).valueOf(),
    field_type_id: null,
  })
}

const onRemoveField = (fieldId) => {
  console.log('--- onRemoveField method ---')
    console.log('fieldId:', fieldId)
  const newArray = deleteFromArray(form.settings.fields, 'id', fieldId)
  // const newArray = _.remove(form.settings.fields, (_, i) => {
  //   console.log('i:', i)
  //   return i === index
  // })

  // form.settings.fields
  console.log('newArray:', newArray)
}

const getFiledCode = (fieldId) => {
  return fieldTypes.value
    .find(field => {
      return field.id === fieldId
    })?.code || null
}

const onSelectFieldType = (fieldId) => {
  const index = _.findIndex(form.settings.fields, ['id', fieldId])

  form.settings.fields[index] = {
    ...form.settings.fields[index],
    ...defaultData
  }
}

const onAddNestedItem = (index) => {
  form.settings.fields[index].nested_items = [
    ...form.settings.fields[index].nested_items,
    {
      id: dayjs(new Date()).valueOf(),
      ...defaultNestedItem,
    }
  ]
}
</script>