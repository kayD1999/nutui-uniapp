<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-11 10:12
 * @FilePath: /src/pages/components/hashCalendar.vue
-->
<template>
  <k-base-layout>
    <!-- #ifdef MP-WEIXIN -->
    <h1 class="font-size-50 color-red bg-gray h-80 lh-10 pl-4">微信小程序不支持日期组件</h1>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">基础使用</p>
    <k-hash-calendar></k-hash-calendar>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">携带默认日期： {{ defauleDate }}</p>
    <k-hash-calendar :default-datetime="defauleDate"></k-hash-calendar>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">滑动方向回调： {{ way }}</p>
    <k-hash-calendar @slidechange-fn="slidechangeFn"></k-hash-calendar>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">选中日期回调： {{ date }}</p>
    <k-hash-calendar @touchend-fn="touchendFn"></k-hash-calendar>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">clickFn回调</p>
    <k-hash-calendar @click-fn="clickFn"></k-hash-calendar>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">changeFn回调</p>
    <k-hash-calendar @change-fn="changeFn"></k-hash-calendar>
    <!-- #endif -->
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'HashCalendar',
  setup() {
    const state = reactive({
      defauleDate: new Date('2023-01-01'),
      way: '',
      date: '',
    });
    const slidechangeFn = (payload) => {
      state.way = payload;
    };
    const touchendFn = (value, textContent) => {
      state.date = textContent;
    };
    const clickFn = (payload) => {
      console.log('回调');
      console.log(payload);
    };
    const changeFn = (payload) => {
      console.log('回调');
      console.log(payload);
    };
    return {
      ...toRefs(state),
      slidechangeFn,
      touchendFn,
      clickFn,
      changeFn,
    };
  },
});
</script>

<style scoped lang="scss"></style>
