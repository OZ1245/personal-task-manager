<template>
  <div class="create-task">
    <div class="create-task__header">
      <h3 class="create-task__title">
        Create Task
      </h3>
    </div>

    <div class="create-task__body">
      <form class="create-task__form">
        <div class="create-task__control">
          <label for="`control-created`">Дата создания:</label>
          <Datepicker
            v-model="created"
            inputFormat="dd.LL.yyyy HH:mm:ss"
            :locale="userLocale"
            disabled
          />
        </div>

        <div
          v-for="(field, i) in fields"
          :key="`field-${i}`" 
          class="create-task__control"
        >
          
          <label :for="`control-${field.id}`">{{ field.name }}:</label>

          <template v-if="field.code === 'INPUT_TEXT'">
            <template v-if="field.multiply">
              <template v-if="form[i].value.length">
                <div
                  v-for="(item, j) in form[i].value"
                  :key="`input-item-${field.id}-${j}`"
                >
                  <input 
                    v-model="form[i].value[j].value"
                    type="text" 
                    :id="`control-${field.id}`"
                  >

                  <button 
                    type="button"
                    @click="onRemoveFiledItem(i, j)"
                  >
                    Remove item
                  </button>
                </div>
              </template>

              <button 
                type="button"
                @click="onAddFiledItem(i)"
              >
                Add item
              </button>
            </template>

            <input 
              v-else
              v-model="form[i].value"
              type="text" 
              :id="`control-${field.id}`"
            >
          </template>

          <select 
            v-if="field.code === 'SELECT_SIMPLE'"
            v-model="form[i].value"
            :id="`control-${field.id}`"
          >
          <option
            v-for="(item, j) in field.nested_items" 
            :key="`select-option-${item.id}-${j}`"
            :value="item.id"
          >
              {{ item.name }}
            </option>
          </select>

          <template v-if="field.code === 'TEXTAREA'">
            <template v-if="field.multiply">
              <template v-if="form[i].value.length">
                <div
                  v-for="(item, j) in form[i].value"
                  :key="`textarea-item-${field.id}-${j}`"
                >
                  <textarea 
                    v-model="form[i].value[j].value"
                    :id="`control-${field.id}`" 
                    :rows="field.rows"
                  ></textarea>

                  <button 
                    type="button"
                    @click="onRemoveFiledItem(i, j)"
                  >
                    Remove item
                  </button>
                </div> 
              </template>

              <button 
                type="button"
                @click="onAddFiledItem(i)"
              >
                Add item
              </button>
            </template>
            <textarea 
              v-else
              v-model="form[i].value"
              :id="`control-${field.id}`" 
              :rows="field.rows"
            ></textarea>
          </template>

          <template v-if="field.code === 'CHECKLIST'">
            <template v-if="form[i].value.length">
              <div 
                v-for="(item, j) in form[i].value"
                :key="`todo-item-${field.id}-${j}`"
              >
                <input 
                  v-model="form[i].value[j].value"
                  type="checkbox" 
                >
                <input 
                  v-model="form[i].value[j].title"
                  type="text"
                >
                <button 
                  type="button"
                  @click="onRemoveFiledItem(i,j)"
                >
                  Remove Item
                </button>
              </div>
            </template>
            <button 
              type="button"
              @click="onAddFiledItem(i)"
            >
              Add item
            </button>
          </template>
        </div>
      </form>
    </div>

    <div class="create-task__footer">
      <button 
        type="button"
        @click="onCancel()"
      >
        Cancel
      </button>
      <button 
        type="button"
        @click="onCreate()"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script setup>
import { useFieldType } from '@/libs/fieldType';
import { useProject } from '@/libs/project';
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import Datepicker from 'vue3-datepicker'
import * as locales from 'date-fns/locale'
import { useUser } from '@/libs/user';
import { useTask } from '@/libs/task';
import { useRouter } from 'vue-router';

const $router = useRouter()
const $project = useProject()
const $fieldType = useFieldType()
const $user = useUser()
const $task = useTask()

const user = computed(() => $user.getUser()).value
const project = computed(() => $project.getProject()).value
const form = ref()
const fields = ref()
const created = ref(new Date())
// TODO: автоматическое подключение локали
console.log('user:', user)
const userLocale = (user.settings.language === 'en') ? locales.enUS : locales.ru

$fieldType
  .fetchFieldTypes()
    .then(result => {
      fields.value = project.settings.fields
        .map(field => {
          return {
            ...field,
            code: result.find(type => type.id === field.field_type_id)?.code
          }
        }) || []

      form.value = [
        ...fields.value
          .map(field => {
            return {
              id: field.id,
              value: field.default_value,
              created: dayjs(new Date()).valueOf(),
              modified: null
            }
          }),
        // {
        //   id: 'created',
        //   value: dayjs(new Date()).valueOf(),
        //   created: dayjs(new Date()).valueOf(),
        //   modified: null
        // }
      ]
    })

const onAddFiledItem = (fieldIndex) => {
  form.value[fieldIndex].value = [
    ...form.value[fieldIndex].value,
    {
      id: dayjs(new Date()).valueOf(),
      title: null,
      value: null,
      created: dayjs(new Date()).valueOf(),
      modified: null
    }
  ]
}

const onRemoveFiledItem = (fieldIndex, itemIndex) => {
  form.value[fieldIndex].value
    .splice(itemIndex, 1)
}

const onCancel = () => {
  $router.back()
}

const onCreate = () => {
  $task
    .createTask({
      created: created.value,
      data: form.value,
      projectId: project.id
    })
    .then(result => {
      console.log('result:', result)
    })
}

</script>

<style lang="scss">
.create-task__body {
  overflow-y: scroll;
  flex-grow: 1;
}
</style>