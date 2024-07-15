<!--
 * @Description: k-table组件demo
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-04 13:47
 * @FilePath: /src/pages/components/kTable.vue
-->
<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <h1 class="font-size-50 color-red bg-gray h-80 lh-10 pl-4">
      微信小程序不支持table标签，建议使用uniapp提供的table组件进行开发
    </h1>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">基础使用</p>
    <k-table :loading="false" :columns="columns" :table-data="tableData"></k-table>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">不展示表头</p>
    <k-table :loading="false" :show-header="false" :columns="columns" :table-data="tableData"></k-table>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">行点击事件</p>
    <k-table :loading="false" :columns="columns" :table-data="tableData" @row-click="rowClick"></k-table>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">插槽自定义配置</p>
    <k-table :loading="false" :columns="columns" :table-data="tableData">
      <template #description="{ row }"> 自定义------{{ row.description }} </template>
    </k-table>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">整行内容自定义</p>
    <k-table :loading="false" :columns="columns" :table-data="tableData" :custom-row="true">
      <template #customRow="{ row }"> 自定义行内容 {{ row }} </template>
    </k-table>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">数据为空</p>
    <k-table :loading="false" :columns="columns" :table-data="[]"></k-table>
    <!-- #endif -->
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'Ktable',
  setup() {
    const state = reactive({
      loading: true,
      columns: [
        {
          title: '证券名称',
          width: '150upx',
          key: 'name',
        },
        {
          title: '说明',
          key: 'description',
        },
      ],
      tableData: [
        { name: 'name1', description: '描述1' },
        { name: 'name2', description: '描述2' },
      ],
    });
    const rowClick = ({ row, index }) => {
      console.log(row);
      console.log(index);
      console.log('行点击事件');
    };
    return {
      ...toRefs(state),
      rowClick,
    };
  },
});
</script>

<style scoped lang="scss"></style>
