<!--
 * @Description: baseLayout使用demo
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-05 10:45
 * @FilePath: /src/pages/components/baseLayout.vue
-->
<template>
  <k-base-layout class="bg-white baseLayout">
    <template #header>
      <view class="bg-red h-100 line-height-10">header</view>
    </template>
    <view class="color-blue font-size-50">content内容</view>
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'BaseLayout',
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss"></style>
