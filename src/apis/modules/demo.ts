import request from '@/utils/request/index';

/**
 * @description: getDemo
 * @return {*}
 */
export function getDemo(params) {
  return request({
    url: '/api/login',
    method: 'get',
    params,
  });
}

/**
 * @description: postDemo
 * @return {*}
 */
export function postDemo(data) {
  return request({
    url: 'xxxx',
    method: 'post',
    data,
  });
}
