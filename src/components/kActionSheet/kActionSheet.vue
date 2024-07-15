<!--
 * @Description: k-action-sheet
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-04 15:12
 * @FilePath: /src/components/kActionSheet/kActionSheet.vue
-->
<template>
  <view class="actionSheet">
    <nut-action-sheet
      v-model:visible="visible"
      :title="title"
      cancel-txt="取消"
      overlay-class="overlayClass"
      @close="close"
    >
      <div class="custom-content">
        <slot name="content"></slot>
      </div>
      <div class="custom-btn">
        <view v-if="isCopy" class="copyButton">
          <nut-button type="primary" shape="square" @click="copy"> 一键复制 </nut-button>
        </view>
        <view :class="isCopy ? 'close' : 'fullClose'">
          <nut-button type="primary" shape="square" :class="isCopy ? 'close' : 'fullClose'" @click="close">
            关闭
          </nut-button>
        </view>
      </div>
    </nut-action-sheet>
  </view>
</template>

<script>
import { defineComponent, nextTick, reactive, toRefs, watch } from 'vue';

export default defineComponent({
  name: 'KActionSheet',
  props: {
    /**
     * @description: 标签
     * @param
     * @author:
     */
    title: {
      type: String,
      default: () => {
        return '';
      },
    },
    /**
     * @description: 默认参数 code
     * @param
     * @author:
     */
    modelValue: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /**
     * @description: 是否展示复制
     * @param
     * @author:
     */
    isCopy: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  emits: ['update:modelValue', 'copy'],
  setup(props, context) {
    const state = reactive({
      visible: false,
    });
    watch(
      () => props.modelValue,
      () => {
        nextTick(() => {
          state.visible = props.modelValue;
        });
      },
      { deep: true, immediate: true },
    );
    const copy = () => {
      context.emit('copy');
    };
    const close = () => {
      state.visible = false;
      context.emit('update:modelValue', state.visible);
    };
    return {
      ...toRefs(state),
      close,
      copy,
    };
  },
});
</script>

<style scoped lang="scss">
.actionSheet {
  :deep(.nut-overlay) {
    z-index: 999 !important;
  }

  :deep(.nut-popup) {
    z-index: 999 !important;
  }

  .custom-content {
    max-height: 70vh;
    min-height: 40vh;
    overflow: hidden auto;
    padding: 0 10px;
    font-size: 28upx;
    font-weight: 400;
    line-height: 48upx;
  }

  .custom-btn {
    margin: 10px 20px;
    display: flex;
    justify-content: space-between;

    .copyButton {
      width: 300upx;
      border-radius: 4px;
      font-size: 32upx;
      font-weight: 400;
      text-align: center;
      line-height: 80upx;
      border: 1px solid rgb(0 0 0 / 15%);
      color: var(--nut-title-color);
      background: yellow;

      :deep(button) {
        width: 100%;
        height: 100% !important;
      }
    }

    .close {
      width: 300upx;

      :deep(button) {
        width: 100%;
        height: 100% !important;
      }
    }

    .fullClose {
      flex: 1;
      width: 100%;

      :deep(button) {
        width: 100%;
        height: 100% !important;
      }
    }
  }
}
</style>
