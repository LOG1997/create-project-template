import axios from "axios";
import { getToken } from "@/utils/auth";
axios.defaults.baseURL = "/api";

//设置超时
axios.defaults.timeout = 3000;
// 请求拦截
axios.interceptors.request.use(
  (config: any) => {
    // token
    const token = getToken();
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status == 200) {
      // TODO:自定义拦截内容
      // switch (+res.code) {
      //   case 10000:
      //     break;
      //   case 10001:
      //     goLogin();
      //     break;
      //   default:
      //     console.log("default");
      //     return Promise.reject(res);
      // }
      return Promise.resolve(response);
    } else {
      return Promise.resolve(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
