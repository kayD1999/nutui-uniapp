import * as qs from 'qs';

import { baseURL, timeout } from '@/configs/request';

import axios from './core';

axios.defaults.headers = {
  ...(axios.defaults?.headers || {}),
  'Content-Type': 'application/json;charset=utf-8',
};

const service = axios.create({
  baseURL,
  timeout,
});

// 请求拦截
service.interceptors.request.use(
  (request) => {
    // useLoading('努力加载中, 请稍后...');
    request.loading = true;

    // const userStore = store.useUserStore();
    // const token = userStore?.token || storage.get('tokenkey');
    // if (token) request.headers['access-token'] = token;

    if (!request.data) request.data = {};

    // 解决query无法传递数组的问题
    request.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' });

    return request;
  },
  (error) => Promise.reject(error),
);

// 响应拦截
// @ts-ignore
service.interceptors.response.use(
  (response) => {
    // if (response?.config?.loading) {
    //     console.log('xx')
    //
    // }
    //
    const res = response.data;
    //
    // // const message = res.message || res.msg;
    // if (res) {
    //
    //     /**
    //      * 异常code处理
    //      * */
    //     // if(res.code === '404'){
    //     //
    //     // }
    //
    //     return res;
    // }
    return res;
  },
  (error) => {
    const status = error.response.status;
    if (status === 500) {
      console.log('网络请求错误');
      // 特殊处理： 若为微信授权登录接口，不需要进行保存提示
    } else if (status === 401 || status === 403 || status === 405) {
      console.log('验证失败，请重新登录!');
    } else if (status === 404) {
      console.log('请求失败!');
    } else {
      console.log('其他错误!');
    }
    return Promise.reject(error);
  },
);

export default service;
