<script setup lang="ts">
import Header from "./Header/index.vue";
</script>

<template>
  <div class="container">
    <div class="head-container">
      <Header></Header>
    </div>
    <div class="main-container">
      <router-view></router-view>
    </div>
    <div class="footer-container"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  .head-container {
    height: 60px;
    width: 100%;
    background-color: aqua;
    position: fixed;
  }

  .main-container {
    padding-top: 60px;
  }
  .footer-container {
  }
}
</style>
