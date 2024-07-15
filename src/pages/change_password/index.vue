<!--
 * @Description:密码更改
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-07 18:20
 * @FilePath: /src/pages/change_password/index.vue
-->
<template>
  <k-base-layout class="index">
    <view class="p-8 bg-white">
      <view class="font-bold">设置登录密码</view>
      <nut-form>
        <nut-form-item label="新密码" label-width="20px">
          <nut-input
            v-model.trim="formData.oldPassword.password"
            placeholder="6-20位数字+字母组合"
            :type="formData.oldPassword.type"
          >
            <template #right>
              <template v-if="formData.oldPassword.type === 'password'">
                <nut-icon name="marshalling" @click="formData.oldPassword.type = 'text'"></nut-icon>
              </template>
              <template v-else-if="formData.oldPassword.type === 'text'">
                <nut-icon name="eye" @click="formData.oldPassword.type = 'password'"></nut-icon>
              </template>
            </template>
          </nut-input>
        </nut-form-item>
        <nut-form-item label="确认密码" label-width="20px">
          <nut-input
            v-model.trim="formData.newPassword.password"
            placeholder="再次输入新密码"
            :type="formData.newPassword.type"
          >
            <template #right>
              <template v-if="formData.newPassword.type === 'password'">
                <nut-icon name="marshalling" @click="formData.newPassword.type = 'text'"></nut-icon>
              </template>
              <template v-else-if="formData.newPassword.type === 'text'">
                <nut-icon name="eye" @click="formData.newPassword.type = 'password'"></nut-icon>
              </template>
            </template>
          </nut-input>
        </nut-form-item>
      </nut-form>
      <view class="mt-60px">
        <nut-button type="info" block @click="handleConfirm">确定</nut-button>
      </view>
      <nut-toast></nut-toast>
    </view>
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const toast = useToast();

    const state = reactive({
      formData: {
        oldPassword: {
          password: '',
          type: 'password',
        },
        newPassword: {
          password: '',
          type: 'password',
        },
      },
    });
    const handleConfirm = () => {
      console.log('确定');
      // 校验密码是否为空
      if (!state.formData.oldPassword.password) return toast.text('请输入密码');
      if (!state.formData.newPassword.password) return toast.text('请输入确认密码');
      // 正则校验密码格式是否合规
      const regExp = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,20})$/;
      const regTest = regExp.test(state.formData.oldPassword.password);
      if (!regTest) return toast.text('请输入符合规则格式的密码');
      // 校验两个密码是否相同
      if (state.formData.oldPassword.password !== state.formData.newPassword.password) {
        return toast.text('两次输入的密码不一致');
      }
      return null;
    };
    return {
      ...toRefs(state),
      handleConfirm,
    };
  },
});
</script>

<style scoped lang="scss"></style>
