<!--
 * @Description: 组合概览
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-25 16:42
 * @FilePath: /src/pages/index/combinationOverview.vue
-->
<template>
  <k-card title="组合概览" right-title="数据日期：2024-04-15" cover-code="IH3pjGMo">
    <nut-table :bordered="false" :columns="tableColums" :data="tableData"></nut-table>
  </k-card>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'CombinationOverview',
  setup() {
    const state = reactive({
      tableColums: [
        {
          title: '组合名称',
          key: 'name',
          stylehead: 'min-width: 70px;max-width: 70px;color:#7b8299;background: #F5F6FA;font-size: 24upx',
          stylecolumn: 'min-width: 70px;font-weight:bolder;max-width: 70px',
        },
        {
          title: '类别',
          key: 'type',
          stylehead:
            'color:#7b8299;background: #F5F6FA;font-size: 24upx;white-space: nowrap;overflow: hidden;textOverflow: ellipsis',
          stylecolumn: 'white-space: nowrap;overflow: hidden;textOverflow: ellipsis',
        },
        {
          title: '单位净值',
          key: 'nav',
          stylehead: 'color:#7b8299;bolder;background: #F5F6FA;font-size: 24upx;',
          stylecolumn: 'color: red;',
        },
        {
          title: '权益仓位',
          key: 'position',
          stylehead: 'color:#7b8299;bolder;background: #F5F6FA;font-size: 24upx',
        },
      ],
      tableData: [
        {
          id: 'YJ20018',
          name: '研究员组合1',
          type: '股票',
          nav: '0.9745',
          navYield: null,
          position: '100.00',
        },
        {
          id: 'X310271',
          name: '研究员组合2',
          type: '股票',
          nav: '0.9843',
          position: '97.06',
        },
        {
          id: 'X310270',
          name: '研究员组合3',
          type: '股票',
          nav: '0.9311',
          position: '99.22',
        },
        {
          id: '337',
          name: '研究员组合4',
          type: '固收类',
          nav: '1.0046',
          position: '0.00',
        },
        {
          id: 'YJ20003',
          name: '研究员组合5',
          type: '固收类',
          nav: '0.7479',
          position: '100.00',
        },
        {
          id: 'X310282',
          name: '研究员组合6',
          type: '股票',
          nav: '1.0246',
          position: '94.23',
        },
        {
          id: '350',
          name: '研究员组合7',
          type: '固收类',
          nav: '1.0088',
          position: '0.00',
        },
        {
          id: '120',
          name: '研究员组合8',
          type: '权益类',
          nav: '1.0765',
          position: '57.01',
        },
        {
          id: 'X310354',
          name: '研究员组合9',
          type: '股票',
          nav: '0.9510',
          position: '96.78',
        },
        {
          id: '294',
          name: '研究员组合10',
          type: '权益类',
          nav: '0.7321',
          position: '85.91',
        },
        {
          id: 'X310025',
          name: '研究员组合11',
          type: '债券',
          nav: '1.0154',
          position: '17.32',
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss"></style>
