import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import Home from "@/views/Home/index.vue";
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
