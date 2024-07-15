<!--
 * @Description: loading组件demo
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-04 15:08
 * @FilePath: /src/pages/components/loading.vue
-->
<template>
  <view>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">基础使用</p>
    <k-loading height="400upx" />
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'Loading',
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss"></style>
