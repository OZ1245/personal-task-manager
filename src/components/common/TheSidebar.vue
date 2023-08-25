<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <slot name="header"></slot>
    </div>
    
    <div class="sidebar__body">
      <slot></slot>
    </div>
    
    <div class="sidebar__footer">
      <slot name="footer"></slot>
    </div>
  </aside>
</template>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--padding-block);

  width: 250px;

  border-right: 1px solid var(--border-color);
}
.sidebar__header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--padding-inline);

  padding-block: var(--padding-block);
  padding-inline: var(--padding-inline);
}
.sidebar__title {
  font-size: var(--font-size-m);
  margin: 0;
}
.sidebar__body {
  flex-grow: 1;
  height: 100%;

  padding-block: var(--padding-block);
  padding-inline: var(--padding-inline);
}
.sidebar__footer {
  padding-block: var(--padding-block);
  padding-inline: var(--padding-inline);
}
</style>