<!--
 * @Description: BaseLayout 页面基础有滚动条的布局
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-05 10:37
 * @FilePath: /src/components/kBaseLayout/kBaseLayout.vue
-->
<template>
  <view class="baseLayout position-relative" style="background: #f5f6fa">
    <view class="header position-sticky pos-top-0 pos-left-0 z-100"><slot name="fixHeader"></slot></view>
    <view><slot></slot></view>
    <view class="drag">
      <nut-drag
        :key="drag"
        class="subscript_box"
        :boundary="{ top: 60, left: 0, bottom: 60, right: 0 }"
        :attract="true"
      >
        <div class="subscript_ul" :class="{ 'subscript_ul-child1': !backTopFlag }">
          <!-- 回到顶部 -->
          <!--          <div v-if="backTopFlag" class="backtop_box" @click="goBacktop">-->
          <!--            <image class="pic" src="@/images/svg/Up.svg" />-->
          <!--          </div>-->
          <div
            v-if="route !== 'pages/index/index' && route !== 'pages/news/index' && route !== 'pages/user/index'"
            class="backtop_box"
            @click="goHome"
          >
            <image class="pic" src="@/images/icon/Home.png" />
          </div>
        </div>
      </nut-drag>
    </view>
    <!--    <k-tabbar v-if="tabindex >= 0" :tabindex="tabindex"></k-tabbar>-->
  </view>
</template>

<script>
import { onPageScroll } from '@dcloudio/uni-app';
import { defineComponent, onMounted, onUnmounted, reactive, toRefs, watch } from 'vue';

import store from '@/store';
import { useThemeStore } from '@/store/modules/theme';
import { switchTab } from '@/utils/basic';

export default defineComponent({
  name: 'KBaseLayout',
  props: {},
  setup() {
    // 获取当前页面栈
    const pages = getCurrentPages();
    // 获取当前页面的实例
    const currentPage = pages[pages.length - 1];
    // 获取页面路由信息
    const route = currentPage.route;

    const state = reactive({
      // 滚动高度显示回到顶部
      backTopFlag: false,
      drag: 0,
      isTabbar: false,
      tabindex: 0,
    });
    onPageScroll((e) => {
      state.backTopFlag = e.scrollTop >= 50;
    });
    onMounted(() => {
      // 监听滚动事件
    });
    onUnmounted(() => {
      // 离开页面时移除监听事件
    });
    // 回到顶部
    const goBacktop = () => {
      uni.pageScrollTo({
        scrollTop: 0,
      });
    };
    // 回到首页
    const goHome = () => {
      switchTab('/pages/index/index');
    };
    watch(
      () => store.useResizeStore().resize,
      () => {
        state.drag += 1;
      },
      { deep: true },
    );
    watch(
      () => route,
      () => {
        const tabbarList = store.useTabbarStore().tabbarList;
        const fullPath = `/${route}`;
        state.tabindex = tabbarList.findIndex((item) => item.url === fullPath || fullPath === '/');
      },
      { deep: true, immediate: true },
    );
    return {
      ...toRefs(state),
      route,
      goHome,
      goBacktop,
      useThemeStore,
    };
  },
});
</script>

<style scoped lang="scss">
.pic {
  width: 40upx;
  height: 40upx;
}

//subscript_box
.drag {
  position: fixed;
  right: 0;
  bottom: 140upx;
  z-index: 900 !important;
  padding: 15upx;

  .subscript_ul {
    box-shadow:
      0 10upx 24upx -24upx rgb(13 46 166 / 2%),
      0 12upx 28upx 0upx rgb(13 46 166 / 3%),
      0upx 14upx 32upx 24upx rgb(13 46 166 / 4%);
    border-radius: 40px;
    overflow: hidden;
    width: 80upx;

    &.subscript_ul-child1 {
      box-shadow: none;
      border-radius: 40px;
      overflow: inherit;

      .backtop_box {
        box-shadow:
          0 10upx 24upx -24upx rgb(13 46 166 / 2%),
          0 12upx 28upx 0upx rgb(13 46 166 / 3%),
          0upx 14upx 32upx 24upx rgb(13 46 166 / 4%);
        border-radius: 40px;
      }
    }
  }

  .backtop_box {
    background: $badge-color;
    width: 80upx;
    height: 80upx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 0;
    top: 0;

    &::after {
      content: ' ';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
    }

    img {
      width: 50%;
      background: $badge-color;
    }

    &.top_2 {
      position: relative;
      top: 80upx;
    }
  }

  .seize_seat {
    width: 80upx;
    height: 80upx;
  }
}

.baseLayout {
  /* #ifdef MP-WEIXIN */
  min-height: 100vh;

  /* #endif */
  .header {
    background: #f5f6fa;
  }
}
</style>
