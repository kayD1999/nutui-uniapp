<!--
 * @Description: 个人功能
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-07 13:25
 * @FilePath: /src/pages/user/user-service.vue
-->
<template>
  <view class="pl-10px pr-10px">
    <nut-cell-group>
      <nut-cell>
        <template #title>
          <span class="font-bold text-16px">服务中心</span>
        </template>
      </nut-cell>
      <nut-cell title="我的收藏" is-link @click="navigateTo('/pages/user_set/index')">
        <template #icon>
          <nut-icon name="follow"></nut-icon>
        </template>
      </nut-cell>
      <nut-cell title="个人设置" is-link @click="navigateTo('/pages/user_set/index')">
        <template #icon>
          <nut-icon name="setting"></nut-icon>
        </template>
      </nut-cell>
      <nut-cell title="联系客服" is-link>
        <template #icon>
          <nut-icon name="service"></nut-icon>
        </template>
      </nut-cell>
    </nut-cell-group>
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

import { navigateTo } from '@/utils/basic';

export default defineComponent({
  name: 'UserService',
  setup() {
    const state = reactive({});

    return {
      ...toRefs(state),
      navigateTo,
    };
  },
});
</script>

<style scoped lang="scss"></style>
