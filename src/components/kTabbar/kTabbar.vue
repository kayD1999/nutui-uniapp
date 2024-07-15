<!--
 * @Description: tabber
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-08 13:28
 * @FilePath: /src/components/kTabbar/kTabbar.vue
-->
<template>
  <nut-tabbar v-model="modelVal" safe-area-inset-bottom @tab-switch="tabSwitch">
    <nut-tabbar-item
      v-for="(item, index) in tabList"
      :key="index"
      :tab-title="item.title"
      :icon="item.icon"
      :value="item.value"
      :dot="item.dot"
    ></nut-tabbar-item>
  </nut-tabbar>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';

import store from '@/store';
import { useLoginStore } from '@/store/modules/login';
import { navigateTo, redirectTo } from '@/utils/basic';

export default defineComponent({
  name: 'KTabbar',
  props: {
    /**
     * @description: 选中标签的索引值或者名称
     * @param
     * @author:
     */
    tabindex: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const state = reactive({
      oldModeVal: 0,
      modelVal: 0,
      tabList: store.useTabbarStore().tabbarList,
    });

    watch(
      () => props.tabindex,
      () => {
        state.oldModeVal = props.tabindex;
        state.modelVal = props.tabindex;
      },
      { deep: true, immediate: true },
    );

    const tabSwitch = (options, index) => {
      if (!useLoginStore().isLogin) {
        setTimeout(() => {
          state.modelVal = state.oldModeVal;
        });
        return navigateTo('/pages/login/index');
      }
      redirectTo(state.tabList[index].url);
      return null;
    };

    return {
      ...toRefs(state),
      tabSwitch,
      redirectTo,
    };
  },
});
</script>

<style scoped lang="scss"></style>
