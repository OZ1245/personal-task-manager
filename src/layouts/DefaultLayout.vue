<template>
  <div class="layout layout--detault">
    <header class="layout__header">Header</header>

    <main class="layout__main">
      <slot></slot>
    </main>

    <footer class="layout__footer">Footer</footer>
  </div>  
</template>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.layout__header {
  width: 100%;
}
.layout__main {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.layout__footer {
  width: 100%;
}
</style>