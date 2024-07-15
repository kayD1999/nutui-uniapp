<!--
 * @Description: 组件使用demo
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-04 13:32
 * @FilePath: /src/pages/components/components.vue
-->
<template>
  <k-base-layout>
    <h1 class="">组件使用示例</h1>
    <button @click="componentsJump('dayjs')">Day.js</button>
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

import { navigateTo } from '@/utils/basic';

export default defineComponent({
  name: 'Global',
  setup() {
    const state = reactive({});
    const componentsJump = (component) => {
      // uni.navigateTo({ url: `/pages/components/${component}` });
      navigateTo(`/pages/global/index?component=${component}`);
    };
    return {
      ...toRefs(state),
      componentsJump,
      navigateTo,
    };
  },
});
</script>

<style scoped lang="scss"></style>
