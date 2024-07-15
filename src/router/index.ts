import store from '@/store';
import { useLoginStore } from '@/store/modules/login';

import pinia from './pinia';
import { routes, tabBarList } from './routes';

const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];

function addInterceptor() {
  const login = store.useLoginStore(pinia);

  list.forEach((item) => {
    // eslint-disable-next-line no-undef
    uni.addInterceptor(item, {
      // eslint-disable-next-line consistent-return
      invoke(e) {
        // 拦截前触发
        const url = e.url.split('?')[0];
        let currentRoute: { [key: string]: any } = {};
        if (e.url === '/') {
          currentRoute = routes[0];
        } else {
          currentRoute = routes.find((item) => {
            return url === item.path;
          });
        }
        // 判断是否为tabbar页面
        const isTabBarUrl = tabBarList.find((item) => {
          return url === `/${item.pagePath}`;
        });
        if (isTabBarUrl || url === '/') return e;

        // 判断是否为404页面
        if (!currentRoute) {
          uni.navigateTo({
            url: '/pages/404/index',
          });
          return false;
        }
        console.log(`token===${login.token}`);

        // 需要登录并且没有token
        if (currentRoute && !login.token && currentRoute.path !== '/pages/login/index') {
          useLoginStore().targetRouteSet(currentRoute.path);
          uni.navigateTo({
            url: '/pages/login/index',
          });
          return false;
        }

        return e;
      },
      success() {
        // 成功回调拦截
      },
      fail(err) {
        // 失败回调拦截
        console.log('interceptor-fail', err);
      },
      complete(res) {
        // 完成回调拦截
        console.log('interceptor-complete', res);
      },
    });
  });
}

function removeInterceptor() {
  list.forEach((item) => {
    // eslint-disable-next-line no-undef
    uni.removeInterceptor(item);
  });
}

export default {
  addInterceptor,
  removeInterceptor,
};
