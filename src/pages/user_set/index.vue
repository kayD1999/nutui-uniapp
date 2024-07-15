<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-07 14:15
 * @FilePath: /src/pages/user_set/index.vue
-->
<template>
  <k-base-layout class="index">
    <view class="user-set bg-white">
      <nut-cell class="mt-0" is-link @click="navigateTo('/pages/user_data/index')">
        <template #icon>
          <nut-avatar size="normal">
            <image
              src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
            />
          </nut-avatar>
        </template>
        <template #title>
          <view class="ml-10px">
            <view class="font-bold">测试用户</view>
            <view class="text-xs">账号：123456</view>
          </view>
        </template>
      </nut-cell>
      <nut-cell title="登录密码" is-link @click="navigateTo('/pages/change_password/index')"></nut-cell>
      <nut-cell-group>
        <nut-cell title="隐私政策" is-link></nut-cell>
        <nut-cell title="服务协议" is-link></nut-cell>
        <nut-cell title="关于我们" is-link></nut-cell>
      </nut-cell-group>
      <view class="logOut">
        <nut-button block shape="round" type="info" class="" @click="logOut">退出登录</nut-button>
      </view>
    </view>
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

import { useLoginStore } from '@/store/modules/login';
import { navigateTo } from '@/utils/basic';

export default defineComponent({
  name: 'Index',
  setup() {
    const state = reactive({});
    const logOut = () => {
      console.log('退出登录');
      useLoginStore().logout();
    };
    return {
      ...toRefs(state),
      navigateTo,
      logOut,
    };
  },
});
</script>

<style scoped lang="scss">
.user-set {
  overflow: hidden;

  .mt-0 {
    margin-top: 0;
  }
}

.logOut {
  width: 680upx;
  margin: 50upx auto;
}
</style>
