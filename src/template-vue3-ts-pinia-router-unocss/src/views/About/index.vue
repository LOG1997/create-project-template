<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const skip = (url: string) => {
  router.push({
    path: url,
  });
};
</script>

<template>
  <h2>About</h2>
  <button @click="skip('/home')">to Home</button>
</template>

<style scoped></style>
