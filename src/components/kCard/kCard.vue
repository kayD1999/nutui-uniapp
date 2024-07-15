<!--
 * @Description: 模块card组件
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-05 15:20
 * @FilePath: /src/components/kCard/kCard.vue
-->
<template>
  <view :class="['cardBox', 'bg-white', 'w-full', 'mb-6px']">
    <k-mask-cover :cover-code="coverCode"></k-mask-cover>
    <view v-if="!noHeader" class="title" :class="{ title_bor: titleBor }">
      <div class="textLeft tl">
        <slot v-if="slotSubTitle" name="subTitle" />
        <template v-else>
          {{ title }}
        </template>
      </div>
      <div class="textRight tr num">
        <slot v-if="slotRightTitle" name="rightTitle" />
        <template v-else>
          <div v-if="rightTitle === '更多'" @click="moreUrl()">
            {{ rightTitle }}
            <nut-icon name="rect-right"></nut-icon>
          </div>
          <div v-else>
            {{ rightTitle }}
          </div>
        </template>
      </div>
    </view>
    <!-- 插槽--模块内容 -->
    <div class="card_body_box">
      <div v-if="loading" class="card_body_loading">
        <nut-icon name="loading" class="nut-icon-am-rotate nut-icon-am-infinite"></nut-icon>
      </div>
      <slot />
    </div>
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs, useSlots } from 'vue';

import { navigateTo } from '@/utils/basic';

export default defineComponent({
  name: 'KCard',
  props: {
    /**
     * @description: 是否展示头部
     * @param
     * @author:
     */
    noHeader: {
      type: Boolean,
      default: false,
    },
    /**
     * @description: card 左边的主标题
     * @param
     * @author:
     */
    title: {
      type: String,
      default: '',
      // required: true,
    },
    /**
     * @description: card 右边的文字
     * @param
     * @author:
     */
    rightTitle: {
      type: String,
      default: '',
    },
    /**
     * @description: card高度
     * @param
     * @author:
     */
    cardHeight: {
      type: Number,
      default: 356,
    },
    /**
     * @description: title 加线条
     * @param
     * @author:
     */
    titleBor: {
      type: Boolean,
      default: false,
    },
    /**
     * @description: 右标题为'更多'时 添加跳转地址
     * @param
     * @author:
     */
    cardUrl: {
      type: String,
      default: '',
    },
    /**
     * @description: 加载动画
     * @param
     * @author:
     */
    loading: {
      type: Boolean,
      default: false,
    },
    coverCode: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const state = reactive({
      height: '',
      slotSubTitle: !!useSlots().subTitle,
      slotRightTitle: !!useSlots().rightTitle,
      slotContent: !!useSlots().slotContent,
      coverStyle: '',
    });
    // 更多跳转
    const moreUrl = () => {
      navigateTo(props.cardUrl);
    };
    return { ...toRefs(state), moreUrl, navigateTo };
  },
});
</script>

<style scoped lang="scss">
.cardBox {
  width: 100%;
  padding: 0 24upx;
  padding-bottom: 12upx;
  box-sizing: border-box;
  position: relative;
  overflow: auto;

  .title {
    height: 75upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    left: 0;
    top: 0;

    .textLeft {
      flex: 1;
      height: 44upx;
      font-size: 28upx;
      font-weight: 600;
      color: var(--nut-title-color);
      line-height: 44upx;
      white-space: nowrap;
      z-index: 80;
    }

    .textRight {
      flex: 1;
      height: 36upx;
      font-size: 24upx;
      font-weight: 400;
      color: var(--text-color); // #7b8299;
      line-height: 36upx;
      white-space: nowrap;
      text-align: right;
    }

    &.title_bor::after {
      content: ' ';
      position: absolute;
      left: -24upx;
      bottom: 0;
      width: 100vw;
      height: 1upx;
      background: rgb(0 0 0 / 6%);
    }
  }

  :deep(.more_btn_date) {
    span:nth-child(1) {
      margin-left: 24upx;
    }

    svg {
      padding-left: 6upx;
    }
  }
}

.card_body_box {
  position: relative;
  left: 0;
  top: 0;
  max-height: calc(600upx - 75upx);
  overflow: auto;

  .card_body_loading {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgb(255 255 255 / 80%);
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
}
</style>
