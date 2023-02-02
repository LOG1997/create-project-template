<script setup lang="ts">
import Header from "./Header/index.vue";
import Footer from "./Footer/index.vue";
</script>

<template>
  <div class="container">
    <header class="head-container">
      <Header></Header>
    </header>
    <main class="main-container">
      <router-view></router-view>
    </main>
    <footer class="footer-container">
      <Footer></Footer>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  .head-container {
    height: 60px;
    width: 100vw;
    background-color: var(--bgColor);
    position: fixed;
    display: flex;
    justify-content: center;
    z-index: 1000;
    box-shadow: 0 1px 2px #767676;
  }
  .main-container {
    padding-top: 60px;
    min-height: calc(100% - 160px);
  }
  .footer-container {
    box-shadow: 1px 0 1px #000;
    // background-color: #767676;
  }
}
</style>
