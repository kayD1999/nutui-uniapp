<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<script setup lang="ts">
import { onHide, onLaunch, onPageNotFound, onShow } from '@dcloudio/uni-app';
import { watch } from 'vue';

import router from './router/index';
import store from './store';

onLaunch(() => {
  console.log('App Launch');
  // 获取菜单
  store.useTabbarStore().setTabbarList();
  // 获取遮罩列表
  store.useMaskCoverStore().getCoverList();
  // #ifdef MP-WEIXIN
  console.log('微信小程序端');
  // #endif
  // #ifndef MP-WEIXIN
  window.addEventListener('resize', () => {
    console.log('resize');
    store.useResizeStore().setResize();
  });
  // #endif
  router.addInterceptor();
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  router.removeInterceptor();
  console.log('App Hide');
});

onPageNotFound(() => {
  uni.navigateTo({
    url: '/pages/404/index',
  });
});

watch(
  () => store.useResizeStore().resize,
  () => {
    console.log('app.vue 设备 size 更新');
  },
);
// watch(
//   () => store.useThemeStore().themeName,
//   () => {
//     console.log('themeName 更新');
//     const name = store.useThemeStore().themeName;
//     import(`./static/theme/${name}.scss?inline`);
//   },
// );
</script>
<style lang="scss">
// 全局样式文件
@import 'nutui-uniapp/styles/index';
@import '@/static/theme/theme1.scss';
@import '@/static/theme/theme2.scss';
</style>
<style scoped lang="scss">
/* #ifdef MP-WEIXIN */
.status_bar {
  height: 25px;
}

/* #endif */
</style>
