<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from '../../components/HelloWorld.vue';
import useStore from '@/store/index';
import { useRouter } from 'vue-router';
import { IUser } from '@/types/user';
import Button from '@/components/Button/index.vue';
import { ElNotification } from 'element-plus';
const store = useStore();
const router = useRouter();

store.user.setUserList();
// eslint-disable-next-line no-undef
let user = ref<IUser[]>([]);
const getUser = () => {
  user.value = store.user.getUserList;
  console.log('😊user.value:', user.value);
  ElNotification({
    title: 'user',
    message: 'user:' + user.value[0].name + ' ' + user.value[1].name,
  });
};
const skip = (url: string) => {
  router.push({
    path: url,
    query: { id: 1 },
  });
};
</script>

<template>
  <div class="flex justify-center">
    <!-- <svg-icon :name="'menu'" class="svgMenu cursor-pointer"></svg-icon> -->
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div class="flex justify-center gap-6">
    <button class="h-12 px-3 rounded-lg" @click="getUser">pinia test</button>
    <button class="h-12 px-3 rounded-lg" @click="skip('about')">
      router test
    </button>
  </div>
  <HelloWorld
    class="mx-auto text-center flex flex-column items-center"
    msg="Vite + Vue"
  />
  <Button type="primary">Button</Button>
</template>

<style scoped lang="scss">
// @include themeify {
//   background: themed(" theme-color"); // theme-color 必须在主题文件里定义
// }

.logo {
  height: 10em;
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

button {
  background-color: #646cff;
  color: #fff;
  &:hover {
    background-color: #646cffaa;
  }
}
</style>
