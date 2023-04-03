import axios, { AxiosResponse } from 'axios';
import { getToken } from '@/utils/auth';
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';
const tokenName = 'Authorization';
export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}
export interface CreateRequestConfig<T = AxiosResponse>
  extends CreateAxiosDefaults {
  interceptors?: RequestInterceptors<T>;
}
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
}
class Request {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>;

  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;
    // MARK:全局请求拦截器
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        console.log('全局请求拦截器');
        // token
        const token = getToken();
        if (token) {
          res.headers[tokenName] = token;
        }

        return res;
      },
      (err: any) => err
    );
    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );
    // MARK:全局响应拦截器
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        console.log('全局响应拦截器');

        return res.data;
      },
      (err: any) => err
    );
  }
  // MARK:封装请求方法
  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }

          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}
export default Request;
