import { defineStore } from 'pinia';

import { getUserCenter } from '@/apis/modules/user';
import { TOKEN_KEY } from '@/enums/cacheEnums';
import { switchTab } from '@/utils/basic';
import cache from '@/utils/cache';

export const useLoginStore = defineStore('loginStore', {
  state: () => ({ userInfo: {}, token: cache.get(TOKEN_KEY) || null, temToken: null, targetRoute: '' }),
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    async getUser() {
      const { data } = await getUserCenter();
      this.userInfo = data;
    },
    login(token: null) {
      this.token = token;
      cache.set(TOKEN_KEY, token);
    },
    logout() {
      this.token = null;
      this.userInfo = {};
      cache.remove(TOKEN_KEY);
      uni.showToast({
        title: '已退出登录！',
      });
      switchTab('/pages/index/index');
    },
    targetRouteSet(targetRoute) {
      this.targetRoute = targetRoute;
    },
  },
});
