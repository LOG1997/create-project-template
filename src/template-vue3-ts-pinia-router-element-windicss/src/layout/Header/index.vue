<script setup lang="ts">
import SwitchDark from "./components/SwitchDark/index.vue";
import Nav from "./components/Nav/index.vue";
</script>

<template>
  <div class="header-container">
    <div class="header-logo">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <Nav></Nav>
    </div>
    <div class="header-info">
      <SwitchDark></SwitchDark>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  width: 80%;
  height: 40px;
  padding: 10px 0;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  place-items: center;
  .header-logo {
    display: flex;
    place-items: center;
  }
}
</style>
