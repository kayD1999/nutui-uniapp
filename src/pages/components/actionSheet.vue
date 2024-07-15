<!--
 * @Description: actionSheet使用demo
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-04 15:14
 * @FilePath: /src/pages/components/actionSheet.vue
-->
<template>
  <view>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">基础使用</p>
    <nut-button type="info" @click="basicUse">开启动作面板</nut-button>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">带复制功能</p>
    <nut-button type="info" @click="copyUse">复制</nut-button>
    <k-action-sheet v-model:modelValue="visible" :title="title" :is-copy="iscopy" @copy="copy">
      <template #content>
        {{ content }}
      </template>
    </k-action-sheet>
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'ActionSheet',
  setup() {
    const state = reactive({
      title: '标题',
      visible: false,
      content: '动作版内容',
      iscopy: false,
    });

    const basicUse = () => {
      state.visible = true;
      state.iscopy = false;
      state.title = '基础使用';
    };

    const copyUse = () => {
      state.visible = true;
      state.iscopy = true;
      state.title = '复制功能';
    };

    const copy = () => {
      console.log('复制回调');
    };

    return {
      ...toRefs(state),
      basicUse,
      copyUse,
      copy,
    };
  },
});
</script>

<style scoped lang="scss"></style>
