/*
 * @Description:
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2023-06-05 18:53:54
 * @FilePath: \dss-h5-ui-xh\src\configs\request.js
 */
// @ts-ignore
// import * as process from 'process';
//
// const isDevelopment = process.env.NODE_ENV === 'development';

// 代理路径
export const proxyPath = import.meta.env.VITE_APP_API_BASE_PATH;

// const tempURL = isDevelopment ? proxyPath : window.location.origin + proxyPath;

const tempURL = proxyPath;

// 请求域名
export const baseURL: String = tempURL;
// 响应成功code值
export const responseSuccessCode = '200';
// 超时时间
export const timeout: Number = 60 * 1000;

export default {
  baseURL,
  responseSuccessCode,
  timeout,
};
