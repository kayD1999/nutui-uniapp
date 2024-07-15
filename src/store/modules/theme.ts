import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({ themeName: '' }),
  getters: {},
  actions: {
    setThemeName(name: string) {
      console.log('store');
      this.themeName = name;
      console.log(this.themeName);
    },
  },
});
