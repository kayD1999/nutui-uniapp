<!--
 * @Description: 重点股票分析
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-25 17:59
 * @FilePath: /src/pages/index/keyStockAnalysis.vue
-->
<template>
  <k-card title="重点股票分析" cover-code="VYGOTj6l">
    <k-empty></k-empty>
  </k-card>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'KeyStockAnalysis',
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss"></style>
