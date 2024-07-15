<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-07 10:57
 * @FilePath: /src/pages/components/headerSearch.vue
-->
<template>
  <k-base-layout>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">基础使用</p>
    <k-header-search v-model="thatDate" @popup-confirm="confirm"></k-header-search>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">自定义标题</p>
    <k-header-search input-title="自定义标题" @popup-confirm="confirm"></k-header-search>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">自定义picker</p>
    <k-header-search
      v-model="customValue"
      custom="custom"
      :custom-picker="true"
      picker-title="自定义标题"
      :columns="colums"
      @popup-confirm="customConfirm"
    ></k-header-search>
    <p class="font-size-30 color-yellow bg-gray h-80 lh-10 pl-4">自定义右侧内容</p>
    <k-header-search model-value="">
      <template #customRight>
        <view class="rightContent">
          <k-down-choice :additional="{ name: 'test', code: '1' }"></k-down-choice>
        </view>
      </template>
    </k-header-search>
    <k-header-search model-value="">
      <template #customRight>
        <view class="seachIco">
          <img class="search-searchicon" src="@/images/icon/search@2x.png" alt="" />
        </view>
      </template>
    </k-header-search>
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'HeaderSearch',
  setup() {
    const state = reactive({
      thatDate: '2021-01-01',
      customValue: 'value3',
      colums: [
        { text: 'text1', value: 'value1' },
        { text: 'text2', value: 'value2' },
        { text: 'text3', value: 'value3' },
        { text: 'text4', value: 'value4' },
      ],
    });
    const confirm = (payload) => {
      console.log('confirm');
      console.log(payload);
      console.log(state.thatDate);
    };
    const customConfirm = (payload) => {
      console.log('customConfirm');
      console.log(payload);
      console.log(state.customValue);
    };
    return {
      ...toRefs(state),
      confirm,
      customConfirm,
    };
  },
});
</script>

<style scoped lang="scss">
.seachIco {
  width: 64upx;
  height: 64upx;
  background: var(--nut-help-color);
  border-radius: 8upx;
  margin: 16upx 24upx 16upx 0;

  :deep(.search-searchicon) {
    // padding: 16upx;
    width: 32upx;
    height: 32upx;
    margin: 16upx;
  }
}

:deep(.menu .nut-menu__bar) {
  box-shadow: none;
}
</style>
