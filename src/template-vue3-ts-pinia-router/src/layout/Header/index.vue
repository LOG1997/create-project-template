<script setup lang="ts">
import SwitchDark from "./components/SwitchDark/index.vue";
</script>

<template>
  <div class="header-container">
    <div class="header-logo">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
    </div>
    <div class="header-info">
      <SwitchDark></SwitchDark>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  place-items: center;
}
</style>
