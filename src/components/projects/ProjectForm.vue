<template>
  <form 
    v-loading="loading"
    class="project-form"
  >
    <h2 class="project-form__title">Settings</h2>

    <h3 class="project-form__subtitle">Fields</h3>

    <template v-if="form.settings?.fields.length">
      <div 
        v-for="(field, i) in form.settings.fields" 
        :key="`settings-field-${i}`"
        class="project-form__field"
      >
        <div class="project-form__field-header">
          <TheSelect
            v-if="fieldTypes.length"
            v-model="field.field_type_id"
            label="Field type"
            placeholder="Выберите тип"
            :options="fieldTypes"
            horizontal
            @change="onSelectFieldType(field.id)"
          />

          <ButtonIcon 
            icon="Trash"
            big
            danger
            title="Delete field"
            @click="onRemoveField(field.id)"
          />
        </div>

        <div 
          v-if="field.field_type_id"
          class="project-form__body"
        >
          <div class="project-form__column-left">
            <TheInput
              v-model="field.name"
              label="Name"
            />

            <TheInput
              v-model="field.constant"
              label="Constant name"
            />

            <TheInput
              v-if="getFiledCode(field.field_type_id) === 'INPUT_TEXT'" 
              v-model="field.default_value"
              label="Default value"
            />

            <template v-if="getFiledCode(field.field_type_id) === 'TEXTAREA'">
              Количество строк
              <input 
                type="number" 
                v-model="field.rows" 
                min="1" 
                max="25"
              />

              <textarea
                :rows="field.rows"
                v-model="field.default_value"
              ></textarea>
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
              <TheCheckbox
                label="Now()"
                v-model="field.date_now"
              />
              <VueDatepicker
                v-if="!field.date_now"
                v-model="field.default_value"
                :range="(field.multiply)"
              />
            </div>
          </div>

          <div class="project-form__column-right">
            <TheCheckbox
              label="Editable"
              v-model="field.editable"
            />

            <TheCheckbox
              label="Multiply"
              v-model="field.multiply"
              @change="onToggleMultiplyDefaultValue(i)"
            />

            <TheCheckbox
              label="Ежедневное"
              v-model="field.dayly"
            />
            
            <TheCheckbox
              label="Показывать при создании"
              v-model="field.show_on_create"
            />
          </div>
        </div>
      </div>
    </template>

    <TheAlert
      v-else
      info
    >
      No fields... yet
    </TheAlert>

    <div class="project-form__footer">
      <TheButton
        accent
        medium
        width="auto"
        @click="onAddField"
      >
        <PlusIcon class="project-form__button-icon"/>
        Add field
      </TheButton>
    </div>
  </form>    
</template>

<script setup>
import { defineProps, reactive, ref } from 'vue'
import { deleteFromArray } from '@/utils/index' 
import { useFieldType } from '@/libs/fieldType'

import dayjs from 'dayjs'
import * as _ from 'lodash'
import { useI18n } from 'vue-i18n'

import VueDatepicker from '@vuepic/vue-datepicker'
import TheInput from '@/components/UI/form/TheInput.vue'
import TheCheckbox from '@/components/UI/form/TheCheckbox.vue'
import TheSelect from '@/components/UI/form/TheSelect'
import ButtonIcon from '@/components/UI/ButtonIcon.vue'
import TheButton from '@/components/UI/TheButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import TheAlert from '../UI/TheAlert.vue'

const $fieldType = useFieldType()
const { t } = useI18n({
  useScope: 'global'
})

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const loading = ref(true)
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
  constant: null,
}
const defaultNestedItem = {
  name: null,
  default: false,
}

$fieldType
  .fetchFieldTypes()
  .then(result => {
    fieldTypes.value = result
      .map(type => ({
        ...type,
        title: t(type.name),
        value: type.id
      }))
    
    loading.value = false
  })

const onAddField = () => {
  form.settings.fields.push({
    ...defaultData,
    id: dayjs(new Date()).valueOf(),
    field_type_id: null,
  })
}

const onRemoveField = (fieldId) => {
  deleteFromArray(form.settings.fields, fieldId, 'id')
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

<style lang="scss">
@import '/src/scss/mixins';

.project-form {
  display: flex;
  flex-direction: column;
  gap: var(--padding-block);
}

// Header
.project-form__title {
  font-size: var(--font-size-s);
  margin: 0;
}
.project-form__subtitle {
  font-size: var(--font-size-s);
  font-weight: 400;
  margin: 0;
}

// Field
.project-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--padding-block);

  padding-block: var(--padding-block);
  padding-inline: var(--padding-inline);
  border: {
    // width: 1px;
    // style: solid;
    // color: var(--border-color);
    radius: var(--border-radius);
  }
  
  @include modify-color(var(--background), 'lighten', 90%);
}
.project-form__field-header {
  display: flex;
  gap: var(--padding-inline);
}
.project-form__body {
  display: flex;
  gap: var(--padding-inline);
}
.project-form__column-left {
  display: flex;
  flex-direction: column;
  gap: var(--padding-block);

  width: 100%;
}
.project-form__column-right {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--padding-block);

  border-left: 1px solid var(--border-color);
  padding-left: var(--padding-inline);
}

// Footer
.project-form__footer {

}
.project-form__button-icon {
  width: var(--icon-size);
  height: var(--icon-size);
}
</style>