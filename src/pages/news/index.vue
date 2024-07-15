<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-11 17:25
 * @FilePath: /src/pages/news/index.vue
-->
<template>
  <k-base-layout class="bg-white index">
    <developing></developing>
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

import developing from '@/pages/developing/index.vue';

export default defineComponent({
  name: 'Index',
  components: {
    developing,
  },
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss"></style>
