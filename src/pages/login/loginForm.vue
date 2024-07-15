<template>
  <view class="login-form-content">
    <view class="input-item">
      <nut-input
        v-model="loginForm.username"
        class="input"
        type="text"
        placeholder="请输入账号"
        maxlength="30"
        clearable
      >
        <template #left>
          <nut-icon name="my" />
        </template>
      </nut-input>
    </view>
    <view class="input-item">
      <nut-input v-model="loginForm.password" class="input" type="password" placeholder="请输入密码" maxlength="20">
        <template #left>
          <nut-icon name="marshalling" />
        </template>
      </nut-input>
    </view>
    <view class="action-btn">
      <nut-button block shape="round" type="info" class="login-btn" @click="handleLogin"> 登 录 </nut-button>
    </view>
    <nut-toast />
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

// import { accountLogin } from '@/apis/modules/account';
import { BACK_URL } from '@/enums/cacheEnums';
import { useLoginStore } from '@/store/modules/login';
import { navigateBack, redirectTo } from '@/utils/basic';
import cache from '@/utils/cache';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const toast = useToast();
    const login = useLoginStore();
    const state = reactive({
      loginForm: {
        username: 'admin',
        password: '123456',
        code: '',
        uuid: '',
      },
    });
    const handleLogin = () => {
      // 账户为空校验
      if (!state.loginForm.username) return toast.text('请输入您的账号');
      // 密码为空校验
      if (!state.loginForm.password) return toast.text('请输入您的密码');
      // -----
      loginSuccess();
      return null;
    };
    const loginSuccess = async () => {
      // const data = await accountLogin(state.loginForm);
      // if (data) {
      const data = {
        access_token: 'ceshi',
      };
      loginHandle(data);
      toast.text('登录成功！');
      // }
    };
    const loginHandle = async (data) => {
      const { access_token } = data;
      login.login(access_token);
      await login.getUser();
      const pages = getCurrentPages();
      if (pages.length > 1) {
        if (useLoginStore().targetRoute) {
          redirectTo(useLoginStore().targetRoute);
          useLoginStore().targetRouteSet('');
        } else {
          navigateBack();
        }
        // const prevPage = pages[pages.length - 2];
        // uni.navigateBack({
        //   success: () => {
        //     // @ts-ignore
        //     const { onLoad, options } = prevPage;
        //     // 刷新上一个页面
        //     // eslint-disable-next-line no-unused-expressions
        //     onLoad && onLoad(options);
        //   },
        // });
      } else if (cache.get(BACK_URL)) {
        uni.redirectTo({ url: cache.get(BACK_URL) });
      } else {
        uni.reLaunch({
          url: '/pages/index/index',
        });
      }
      cache.remove(BACK_URL);
    };
    return {
      ...toRefs(state),
      handleLogin,
    };
  },
});
</script>

<style scoped lang="scss">
.login-form-content {
  margin: 40vh auto 2rem;
  width: 90%;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 1rem;

  /* box-shadow: 0 4px 6px #b0b0b080; */

  /* border: 1px solid #b0b0b080; */
  z-index: 2;
  position: relative;

  .input-item {
    margin-bottom: 1rem;

    .nut-input {
      background: rgb(255 255 255 / 0%);
    }

    .input {
      font-size: 1rem;
      line-height: 1.5rem;
      text-align: left;
      position: relative;
    }

    .input:hover {
      --nut-input-border-bottom: #0693e3;
    }
  }

  .login-btn {
    margin-top: 40px;
  }
}
</style>
