import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
// 全局svg组件
import "virtual:svg-icons-register";
import svgIcon from "@/components/SvgIcon/index.vue";
// svg全局组件
app.component("svg-icon", svgIcon);
app.mount("#app");
