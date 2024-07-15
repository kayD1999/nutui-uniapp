<template>
  <view :class="['normalLoginContainer', login.backgroundColor]">
    <view class="logo-content">
      <image :src="login.backgroundImg" class="bannerImg" mode="aspectFill" alt="" />
    </view>
    <view class="logo-content logoImgView">
      <div class="logoImgdiv">
        <image class="logoImg" src="../../static/login/login.png"></image>
        <!-- <span class="palette-header-name">App</span> -->
      </div>
    </view>
    <loginForm></loginForm>

    <div class="top_but" @click="show = true">
      <nut-icon name="shop3"></nut-icon>
    </div>
    <nut-popup v-model:visible="show" position="bottom">
      <nut-picker v-model="val" :columns="columns" title="请选择主题" @confirm="confirm" @cancel="show = false" />
    </nut-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue';

import loginForm from './loginForm.vue';

const login = ref({
  backgroundColor: 'background-waves',
  backgroundImg: `../../static/login/waves.gif`,
});

const show = ref(false);
const val = ref(['waves']);
const vals = ref('波浪');
const columns = ref([
  { text: '蓝色', value: 'gushi', img: 'my_topbg.png', backgroundColor: 'background-white' },
  { text: '渐变', value: 'gradient', img: 'head.png', backgroundColor: 'background-gradient' },
  { text: '波浪', value: 'waves', img: 'waves.gif', backgroundColor: 'background-waves' },
  // { text: '粒子', value: 'lizi', img: 'earth.gif', backgroundColor: 'background-black' },
]);

const confirm = ({ selectedOptions }) => {
  vals.value = selectedOptions[0].text;

  login.value.backgroundColor = selectedOptions[0].backgroundColor;
  login.value.backgroundImg = `../../static/login/${selectedOptions[0].img}`;

  show.value = false;
};
</script>

<style scoped lang="scss">
.normalLoginContainer {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;

  .logo-content {
    position: absolute;
  }

  .bannerImg {
    width: 100vw;
    height: 35vh;
    display: block;
    border: 0;
    overflow: hidden;
  }
}

.background-white {
  background-color: white;
  color: black;
}

.background-black {
  background-color: black;
  color: white;
}

.background-waves {
  background-color: white;
  color: black;

  .bannerImg {
    height: 35vh;
  }
}

.background-gradient {
  background-color: #f5f5f5;
  color: black;

  .bannerImg {
    height: 45vh;
  }

  .login-form-content {
    background-color: rgb(255 255 255);
    margin-top: 35vh;
  }
}

.top_but {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  // border: 1px solid #2a2a2a;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255 255 255 / 80%);
}

.logoImgView {
  width: 100vw;
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logoImg {
  width: 214px;
  height: 50px;
}

.palette-header-name {
  min-width: 426px;
  background-color: #ffff;
  // background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 48px;
  font-weight: 600;
  margin-top: 7px;
  margin-left: 4px;
}
</style>
