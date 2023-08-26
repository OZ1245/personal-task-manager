<template>
  <div
    v-loading="loading" 
    class="templates"
  >
    <ul
      v-if="templates.length" 
      class="templates__list"
    >
      <li
        v-for="(template, i) in templates"
        :key="`template-${i}`"
        class="templates-list__item"
      >
        <h3 class="templates-list__title">
          {{ template.name }}
        </h3>

        <div class="templates-list__controls">
          <TheButton
            success
            medium
          >
            <CheckIcon
              class="templates-list__button"
            />
          </TheButton>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTemplate } from '@/libs/template'

import TheButton from '@/components/UI/TheButton.vue';
import { CheckIcon } from '@heroicons/vue/24/outline';

const $template = useTemplate()
const templates = ref([])

const loading = ref(true)

$template
  .fetchTemplates()
  .then(result => {
    templates.value = result

    loading.value = false
  })
</script>

<style lang="scss">
.templates-list__button {
  width: var(--icon-size);
  height: var(--icon-size);
}
</style>