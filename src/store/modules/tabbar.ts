import { defineStore } from 'pinia';

export const useTabbarStore = defineStore('tabbar', {
  state: () => ({
    tabbarList: {},
  }),
  getters: {},
  actions: {
    setTabbarList() {
      this.tabbarList = [
        { title: '首页', icon: 'home', value: 10, dot: false, url: '/pages/index/index' },
        { title: '咨讯', icon: 'find', value: 0, dot: false, url: '' },
        { title: '我的', icon: 'my', value: 0, dot: true, url: '/pages/user/index' },
      ];
    },
  },
});
