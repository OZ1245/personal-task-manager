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
        class="templates__item"
      >
        <h3 class="templates__title">
          {{ template.name }}
        </h3>

        <div class="templates__controls">
          <ButtonIcon
            icon="ArrowSmallRight"
            title="Select template"
            medium
            accent
            @click="emits('select-template', template)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ITemplate } from '@/api/templates';
import { useTemplate } from '@/libs/template'
import ButtonIcon from '@/components/UI/ButtonIcon.vue';

const $template = useTemplate()
const templates = ref<ITemplate[]>([])

const loading = ref(true)

const emits = defineEmits<{
  (e: 'select-template', template: ITemplate ): void
}>()

$template
  .fetchTemplates()
  .then(result => {
    templates.value = result

    loading.value = false
  })
</script>

<style lang="scss">
@import '@/scss/mixins';

.templates__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(var(--padding-inline) / 2);

  border-radius: var(--border-radius);
  background-color: var(--background);

  padding-block: calc(var(--padding-block) / 2);
  padding-inline: calc(var(--padding-inline) / 2);

  cursor: pointer;

  &:hover {
    @include modify-color(var(--background), 'lighten', 90%);

    .templates__controls {
      visibility: visible;
    }
  }
}

.templates__title {
  font-size: var(--font-size-s);
  font-weight: 400;
  margin: 0;
}

.templates__controls {
  visibility: hidden;
}
</style>