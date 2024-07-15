import { defineStore } from 'pinia';

export const useResizeStore = defineStore('resize', {
  state: () => ({ resize: 0 }),
  getters: {},
  actions: {
    setResize() {
      this.resize += 1;
    },
  },
});
