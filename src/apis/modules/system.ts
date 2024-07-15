// import qs from 'qs';

import mockData from '@/apis/mock/tsconfig.json';
import mockDatas from '@/apis/mock/tsconfigs.json';
import request from '@/utils/request';

/** *****
 * @description: 内网/外网/白名单
 * @return {*}
 */
// 测试端接口
// export function mobileRolePossessed(data: Record<string, any>) {
//   return request.get({
//     url: `/mobileRole/possessed?${qs.stringify(data)}`,
//   });
// }
// mock数据
export const mobileRolePossessed = ({
  // mockData = mockData,
  delay = 500,
} = {}) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: '200',
        data: mockData.data,
      });
    }, delay);
  });

/** *****
 * @description: 菜单列表
 * @return {*}
 */
// 测试端接口
// export function menuAndAssemblyMenuList() {
//   return request.get({
//     url: `/menuAndAssembly/menuList`,
//   });
// }
// mock数据
export const menuAndAssemblyMenuList = ({ mockData = mockDatas.data, delay = 500 } = {}) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: '200',
        data: mockData,
      });
    }, delay);
  });

/** *****
 * @description: 组件列表
 * @return {*}
 */
export function menuAndAssemblyAssemblyList() {
  return request.get({
    url: `/menuAndAssembly/assemblyList`,
  });
}

/** *****
 * @description: 外网遮挡列表
 * @return {*}
 */
export function mobileRoleCoverList() {
  return request.get({
    url: `/mobileRole/coverList`,
  });
}
