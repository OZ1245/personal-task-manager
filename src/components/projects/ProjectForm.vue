<template>
  <form>
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
            ></textarea>

            <br>

            Количество строк
            <input 
              type="number" 
              v-model="field.rows" 
              min="1" 
              max="25"
            />
          </template>

          <div v-if="getFiledCode(field.field_type_id) === 'CHECKLIST'">
            <input type="text" v-model="field.default_value">
            <input 
              v-model="field.checked"
              type="checkbox"
              :id="`checkbox-${i}`" 
              :name="`checkbox-${i}`" 
            > 
            <label :for="`checkbox-${i}`">
              Выбрано
            </label>
          </div>

          <div v-if="getFiledCode(field.field_type_id) === 'SELECT_SIMPLE'">
            <!-- TODO: search prop -->
            <template v-if="field.nested_items.length">
              <div 
                v-for="(item, k) in field.nested_items"
                :key="`nested-item-${k}`"
              >
                <input type="hidden" v-model="item.id">
                <input type="text" v-model="item.name"/>
                <input
                  v-model="field.default_value" 
                  type="radio"
                  :id="`nested-item-${field.id}-${k}`" 
                  :name="field.default_value" 
                  :value="item.id"
                > 
                <label :for="`nested-item-${field.id}-${k}`">
                  По-умолчанию
                </label>
                <button v-if="field.nested_items.length > 1" type="button">Удалить</button>
              </div>
            </template>
            <button type="button" @click="onAddNestedItem(i)">Добавить</button>
          </div>

          <div v-if="getFiledCode(field.field_type_id) === 'DATE'">
            <VueDatepicker
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
          
          <input 
            v-model="field.multiply"
            type="checkbox" 
            :id="`field-${i}-multiply`"
            @change="onToggleMultiplyDefaultValue(i)"
          >
          <label :for="`field-${i}-multiply`">Multiply</label>

          <br>
          
          <input type="checkbox" v-model="field.dayly">
          <label for="">Ежедневное</label>
          
          <br>
          
          <input 
            v-model="field.show_on_create"
            type="checkbox" 
            :id="`field-${i}-on-create`"
          >
          <label :for="`field-${i}-on-create`">Показывать при создании</label>
        </template>

        <br>

        <button type="button" @click="onRemoveField(field.id)">Delete field</button>

        <br>
        <br>
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

import VueDatepicker from '@vuepic/vue-datepicker'

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
  multiply: false,
  dayly: false,
  rules: null,
  nested_items: [],
  rows: 3,
  search: false,
  date_now: false,
  checked: false,
  show_on_create: true,
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
  deleteFromArray(form.settings.fields, 'id', fieldId)
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

const onToggleMultiplyDefaultValue = (index) => {
  form.settings.fields[index].default_value = form.settings.fields[index].multiply ? [] : null
}
</script>