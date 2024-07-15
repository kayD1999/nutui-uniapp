<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-05 16:48
 * @FilePath: /src/pages/components/downChoice.vue
-->
<template>
  <k-base-layout class="bg-white downChoice">
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">基础使用：单选</p>
    <k-down-choice :additional="additional1" placeholder-name="单选占位"></k-down-choice>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">基础使用：多选</p>
    <k-down-choice
      :additional="additional2"
      placeholder-name="多选占位"
      select-type="more"
      @close="downChoiceClose"
    ></k-down-choice>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">多选限制最大可选值 5</p>
    <k-down-choice
      :additional="additional2"
      placeholder-name="多选占位"
      select-type="more"
      :max-options="5"
      @close="downChoiceClose"
    ></k-down-choice>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">不需要搜索功能</p>
    <k-down-choice
      :is-search="false"
      :additional="additional2"
      placeholder-name="多选占位"
      select-type="more"
      @close="downChoiceClose"
    ></k-down-choice>
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'DownChoice',
  setup() {
    const state = reactive({
      additional1: {
        name: '煤炭',
        code: '740000',
      },
      additional2: {
        name: '煤炭,农林牧渔',
        code: '740000,110000',
      },
    });
    const downChoiceClose = (callback) => {
      console.log('callback');
      console.log(callback);
    };
    return {
      ...toRefs(state),
      downChoiceClose,
    };
  },
});
</script>

<style scoped lang="scss"></style>
