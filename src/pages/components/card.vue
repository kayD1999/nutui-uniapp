<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-05 15:23
 * @FilePath: /src/pages/components/card.vue
-->
<template>
  <k-base-layout>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">基础使用</p>
    <k-card title="标题">
      <view>card内容</view>
    </k-card>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">标题插槽</p>
    <k-card>
      <template #subTitle>标题插槽</template>
      <view>card内容</view>
    </k-card>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">右侧标题</p>
    <k-card>
      <template #subTitle>标题插槽</template>
      <template #rightTitle>右侧标题</template>
      <view>card内容</view>
    </k-card>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">设置card高度 400upx</p>
    <k-card card-height="400" :title-bor="true">
      <template #subTitle>标题插槽</template>
      <template #rightTitle>右侧标题</template>
      <view>card内容</view>
      <view>card内容</view>
      <view>card内容</view>
      <view>card内容</view>
      <view>card内容</view>
      <view>card内容</view>
      <view>card内容</view>
      <view>card内容</view>
      <view>card内容</view>
      <view>card内容</view>
      <view>card内容</view>
    </k-card>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">title 加线条</p>
    <k-card :title-bor="true">
      <template #subTitle>标题</template>
      <view>card内容</view>
    </k-card>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">隐藏头部标题</p>
    <k-card :no-header="true">
      <template #subTitle>标题插槽</template>
      <template #rightTitle>右侧标题</template>
      <view>card内容</view>
    </k-card>
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'Card',
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss"></style>
