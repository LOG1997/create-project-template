/**
 * 网络请求配置
 */
import axios from "axios";

axios.defaults.timeout = 30000;
axios.defaults.baseURL = "/api";

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    // token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    const res = response.data;

    switch (res.code * 1) {
      case 10000:
        return res;
      case 10001:
        console.log("10001");
        break;
      case 10002:
        console.log("10002");
        break;
      default:
        console.log("default");
        return res;
    }
    return res;
  },
  (error) => {
    console.log("请求出错：", error);
    return Promise.reject(error);
  }
);

export default axios;
