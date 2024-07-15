<!--
 * @Description: 个人资料
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-07 15:13
 * @FilePath: /src/pages/user_data/index.vue
-->
<template>
  <k-base-layout class="index">
    <view class="bg-white pt-8">
      <view class="upload relative">
        <nut-avatar size="large" class="pic">
          <image
            src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
          />
        </nut-avatar>
        <nut-uploader :url="uploadUrl" :is-preview="false" :before-upload="beforeUpload"></nut-uploader>
      </view>
      <view class="tip text-coolgray text-xs">点击修改头像</view>

      <nut-form>
        <nut-form-item label="账号">
          <view class="text-black">{{ info.account }}</view>
        </nut-form-item>
        <nut-form-item label="昵称">
          <view class="flex center justify-between" @click="changeNickName">
            <view class="text-black">{{ info.nickName }}</view>
            <nut-icon name="right" custom-color="black"></nut-icon>
          </view>
        </nut-form-item>
        <nut-form-item label="手机号">
          <view class="flex center justify-between">
            <view class="text-black">{{ info.phoneNumber }}</view>
            <nut-button size="small" type="info" plain @click="changePhoneNumberVisible = true">更换手机号</nut-button>
          </view>
        </nut-form-item>
        <nut-form-item label="注册时间">
          <view class="text-black">{{ info.registrationTime }}</view>
        </nut-form-item>
      </nut-form>

      <nut-dialog v-model:visible="changeNickNameVisible" title="修改昵称">
        <template #default>
          <nut-input v-model="nickName"></nut-input>
        </template>
        <template #footer>
          <nut-button type="info" block @click="onNickNameOk">确认</nut-button>
        </template>
      </nut-dialog>

      <nut-dialog v-model:visible="changePhoneNumberVisible" title="修改手机号码">
        <template #default>
          <nut-input placeholder="请输入新的手机号码" type="number"></nut-input>
          <view class="getCode flex center justify-between">
            <nut-input placeholder="请输入验证码" type="number"></nut-input>
            <nut-button type="info" plain size="small" shape="square">获取验证码</nut-button>
          </view>
        </template>

        <template #footer>
          <nut-button type="info" block @click="oPhoneNumbernOk">确认</nut-button>
        </template>
      </nut-dialog>
    </view>
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const state = reactive({
      uploadUrl: 'http://',
      info: {
        account: '123456',
        nickName: '测试用户',
        phoneNumber: '15835392444',
        registrationTime: '2024-04-03',
      },
      changeNickNameVisible: false,
      nickName: '123456',
      changePhoneNumberVisible: false,
    });
    const beforeUpload = (uploadFile, option) => {
      console.log(uploadFile);
      // 图片信息
      console.log(option);
    };
    const changeNickName = () => {
      state.changeNickNameVisible = true;
      state.nickName = state.info.nickName;
    };
    const onNickNameOk = () => {
      console.log('修改昵称');
      state.changeNickNameVisible = false;
    };
    const oPhoneNumbernOk = () => {
      console.log('修改手机号');
      state.changePhoneNumberVisible = false;
    };
    return {
      ...toRefs(state),
      beforeUpload,
      changeNickName,
      onNickNameOk,
      oPhoneNumbernOk,
    };
  },
});
</script>

<style scoped lang="scss">
.upload {
  width: 150upx;
  height: 150upx;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;

  :deep(.nut-avatar) {
    width: 100%;
    height: 100%;
  }

  :deep(.nut-uploader) {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}

.tip {
  text-align: center;
  margin: 20upx 0;
}

.getCode {
  :deep(.nut-button) {
    border: none;
    border-left: 1px solid var(--nut-input-border-bottom, #eaf0fb);
  }
}
</style>
