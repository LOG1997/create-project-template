<script lang="ts" setup>
import Header from '~/layouts/components/Header/index.vue';
import Footer from '~/layouts/components/Footer/index.vue';
</script>

<template>
  <div>
    <Header></Header>
    <main class="min-h-[calc(100vh-13rem)]">
    <slot /></main>
    <Footer></Footer>
  </div>
</template>
<style>

</style>