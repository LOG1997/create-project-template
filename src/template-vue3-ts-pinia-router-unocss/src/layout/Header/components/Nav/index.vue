<script setup lang="ts">
import { navList } from "./config";

const skip = (url: string) => {
  window.open(url, "_self");
};
</script>

<template>
  <div class="nav-container">
    <ul>
      <li v-for="item in navList.data" :key="item.id" @click="skip(item.url)">
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.nav-container {
  height: 100%;
  ul {
    list-style: none;
    margin: 0px;
    display: flex;
    li {
      padding: 0 20px;
      span {
        cursor: pointer;
        font-size: 18px;
      }
      &:hover {
        // color: aquamarine;
        filter: drop-shadow(0 0 0 black);
      }
    }
  }
}
</style>
