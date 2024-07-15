<!--
 * @Description: 组件使用demo
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-04 13:32
 * @FilePath: /src/pages/components/components.vue
-->
<template>
  <view>
    <button @click="componentsJump('loading')">kLoading</button>
    <button @click="componentsJump('table')">kTable</button>
    <button @click="componentsJump('actionSheet')">kActionSheet</button>
    <button @click="componentsJump('empty')">kEmpty</button>
    <button @click="componentsJump('baseLayout')">kBaseLayout</button>
    <button @click="componentsJump('card')">KCard</button>
    <button @click="componentsJump('downChoice')">KDownChoice</button>
    <button @click="componentsJump('fluctuationText')">KFluctuationText</button>
    <button @click="componentsJump('headerSearch')">kHeaderSearch</button>
    <button @click="componentsJump('hashCalendar')">kHashCalendar</button>
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

import { navigateTo } from '@/utils/basic';

export default defineComponent({
  name: 'Components',
  setup() {
    const state = reactive({});
    const componentsJump = (component) => {
      navigateTo(`/pages/components/${component}`);
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
