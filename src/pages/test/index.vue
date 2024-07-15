<template>
  <k-base-layout>
    <view class="status_bar"></view>
    <!--  #ifdef  H5 -->
    <view>自定义指令</view>
    <nut-button v-hasDemo="['1']" type="info" shape="square">v-hasDemo：value（1）</nut-button>
    <nut-button v-hasDemo="['2']" type="info" shape="square">v-hasDemo：value（2）</nut-button>
    <nut-button v-hasDemo="['3']" type="info" shape="square">v-hasDemo：value（3）</nut-button>
    <!--  #endif -->
    <view class="content border-0">
      <nut-button type="primary" @click="onThemeChange('theme1')">主题1</nut-button>
      <nut-button type="primary" @click="onThemeChange('theme2')">主题2</nut-button>
      <nut-button type="default">默认按钮</nut-button>
      <nut-button type="info" shape="square" @click="navigateTo('/pages/store/store')">store仓库示例</nut-button>
      <nut-button type="info" shape="square" @click="navigateTo('/pages/apiDemo/apiDemo')">api请求示例</nut-button>
      <nut-button type="info" shape="square" @click="navigateTo('/pages/components/components')">组件示例</nut-button>
      <nut-button type="info" shape="square" @click="navigateTo('/pages/global/11111')"
        >测试跳转不存在的路径</nut-button
      >
      <nut-button type="info" shape="square" @click="navigateTo('/pages/global/components')">全局</nut-button>
    </view>
    <view>
      <nut-icon name="dongdong" custom-color="#fa2c19"></nut-icon>
      <nut-icon name="dongdong" custom-color="#64b578"></nut-icon>
      <nut-icon name="JD" custom-color="#fa2c19"></nut-icon>
      <nut-button shape="square" plain type="primary">
        <template #icon>
          <nut-icon name="star-fill" />
        </template>
      </nut-button>
      <nut-button shape="square" type="primary">
        <template #icon>
          <nut-icon name="star" />
        </template>
        收藏
      </nut-button>
    </view>
    <nut-grid>
      <nut-grid-item text="文字"><nut-icon name="dongdong" /></nut-grid-item>
      <nut-grid-item text="文字"><nut-icon name="dongdong" /></nut-grid-item>
      <nut-grid-item text="文字"><nut-icon name="dongdong" /></nut-grid-item>
      <nut-grid-item text="文字"><nut-icon name="dongdong" /></nut-grid-item>
      <nut-grid-item text="文字"><nut-icon name="dongdong" /></nut-grid-item>
      <nut-grid-item text="文字"><nut-icon name="dongdong" /></nut-grid-item>
      <nut-grid-item text="文字"><nut-icon name="dongdong" /></nut-grid-item>
      <nut-grid-item text="文字"><nut-icon name="dongdong" /></nut-grid-item>
    </nut-grid>
    <div class="text-center text-color-red w-2 border-10">Hello World!</div>
    <div>
      <!--    {{ $dayjs().format('YYYY-MM-DD') }}-->
    </div>
    <div>
      <!--    {{ $dayjs('2019-01-25').unix() }}-->
    </div>
  </k-base-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

import components from '@/pages/components/components.vue';
import store from '@/store';

import { navigateTo } from '../../utils/basic';

export default defineComponent({
  name: 'Index',
  setup() {
    const state = reactive({
      title: 'title',
    });

    const onThemeChange = (name) => {
      store.useThemeStore().setThemeName(name);
    };

    return {
      ...toRefs(state),
      onThemeChange,
      navigateTo,
    };
  },
  computed: {
    components() {
      return components;
    },
  },
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :deep(.nut-button) {
    margin: 0.6rem;
  }
}
</style>
