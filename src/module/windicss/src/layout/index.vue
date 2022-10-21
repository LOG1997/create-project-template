<script setup lang="ts">
import Header from "./Header/index.vue";
import Footer from "./Footer/index.vue";
</script>

<template>
  <div class="container w-screen">
    <header
      class="head-container h-16 w-screen flex justify-center items-center shadow-lg"
    >
      <Header></Header>
    </header>
    <main class="main-container w-screen box-content h-[calc(100vh-10rem)]">
      <router-view></router-view>
    </main>
    <footer class="footer-container w-screen">
      <Footer></Footer>
    </footer>
  </div>
</template>

<style scoped lang="scss"></style>
