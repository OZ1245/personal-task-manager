<template>
  <header class="default-header">
    <div class="default-header__left">
      <h1 class="default-header__project-title">
        Personal Task Manager
      </h1>
    </div>

    <div class="default-header__right">
      {{ user?.settings.name || 'User Name' }}
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useUser } from '@/libs/user'

const $user = useUser()

const user = computed(() => $user.getUser())
</script>

<style lang="scss">
.default-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-inline: var(--padding-inline);
  padding-block: var(--padding-block);
  border-bottom: 1px solid var(--border-color);
}
.default-header__left {
  display: inline-flex;
  align-items: center;
  gap: var(--padding-inline);
}
.default-header__back-icon {
  width: var(--icon-size-big);
  height: var(--icon-size-big);
  color: var(--text-base);
}
.default-header__project-title {
  font-weight: 500;
  font-size: 22px;
  margin: 0;
}
.default-header__settings-icon {
  width: var(--icon-size-big);
  height: var(--icon-size-big);
  color: var(--text-base);
}
</style>