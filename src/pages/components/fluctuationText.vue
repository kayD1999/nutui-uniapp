<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-06 16:31
 * @FilePath: /src/pages/components/fluctuationText.vue
-->
<template>
  <k-base-layout>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">基础使用：单选</p>
    <k-fluctuation-text
      value="8822"
      font-size="40upx"
      icon-left="¥"
      icon-left-color="red"
      icon-right="亿"
      icon-right-color="green"
      division="underline"
      colors="#EC0B26"
    />
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'FluctuationText',
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss"></style>
