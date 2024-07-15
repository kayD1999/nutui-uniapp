import { defineStore } from 'pinia';

import { mobileRoleCoverList } from '@/apis/modules/system';

export const useMaskCoverStore = defineStore('maskCover', {
  state: () => ({ coverList: [] }),
  getters: {},
  actions: {
    // 获取外网遮罩列表
    getCoverList() {
      mobileRoleCoverList().then(({ data }) => {
        console.log('cover');
        console.log(data);
        this.coverList = data || [];
      });
    },
  },
});
