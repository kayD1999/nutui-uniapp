<!--
 * @Description: 个人信息
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-07 09:48
 * @FilePath: /src/pages/user/user-info.vue
-->
<template>
  <view class="user-info flex justify-between p-20px">
    <template v-if="isLogin">
      <view class="flex center">
        <nut-avatar size="large">
          <image
            src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
          />
        </nut-avatar>
        <view class="text-white ml-10px">
          <view class="text-xl">测试用户</view>
          <view class="text-xs">账号：123456</view>
        </view>
      </view>
      <view>
        <nut-icon name="setting" custom-color="#fff" size="20" @click="navigateTo('/pages/user_set/index')"></nut-icon>
      </view>
    </template>
    <template v-else>
      <view class="flex center">
        <nut-avatar size="large">
          <image src="../../static/images/default_avatar.png" />
        </nut-avatar>
        <view class="text-white ml-10px" @click="toLogin">
          <view class="text-xl">登录</view>
          <view class="text-xs">点击登录</view>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue';

import { useLoginStore } from '@/store/modules/login';
import { navigateTo } from '@/utils/basic';

export default defineComponent({
  name: 'UserInfo',
  setup() {
    const state = reactive({
      token: useLoginStore().token,
    });
    const isLogin = computed(() => {
      return useLoginStore().isLogin;
    });
    const toLogin = () => {
      navigateTo('/pages/login/index');
    };
    return {
      ...toRefs(state),
      isLogin,
      toLogin,
      navigateTo,
    };
  },
});
</script>

<style scoped lang="scss">
.user-info {
  background: url('../../static/images/my_topbg.png');
  //height: 150upx;
  background-position: bottom;
  background-size: 100% auto;
}
</style>
