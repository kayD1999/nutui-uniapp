<!--
 * @Description: 空内容使用demo
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-04 16:14
 * @FilePath: /src/pages/components/empty.vue
-->
<template>
  <view>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">基础使用</p>
    <k-empty />
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">切换自定义图片</p>
    <k-empty class="cutomClass" image-name="emptyScoring" />
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'Empty',
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.cutomClass {
  :deep(.emptyImg) {
    width: 340upx !important;
    height: 300upx !important;
  }
}
</style>
