<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "../../components/HelloWorld.vue";
import useStore from "@/store/index";
import { useRouter } from "vue-router";
import { IUser } from "@/types/user";
const store = useStore();
const router = useRouter();

store.user.setUserList();
// eslint-disable-next-line no-undef
let user = ref<IUser[]>([]);
const getUser = () => {
  user.value = store.user.getUserList;
};
const skip = (url: string) => {
  router.push({
    path: url,
    query: { id: 1 },
  });
};
</script>

<template>
  <div>
    <svg-icon :name="'menu'" class="svgMenu cursor-pointer"></svg-icon>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <button @click="getUser">pinia test</button>
  <button @click="skip('about')">router test</button>
  <div class="username" v-if="user.length">
    <span v-for="item in user" :key="item.age">{{ item.name }}</span>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  z-index: 0;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
