<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-07 10:59
 * @FilePath: /src/components/kHeaderSearch/kHeaderSearch.vue
-->
<template>
  <view class="box">
    <view class="formHeader">
      <view class="formHeader-date">
        <span class="inputTitle">{{ inputTitle }}</span>
        <nut-input
          v-model="popupDesc"
          class="date-input"
          placeholder="请输入文本"
          :readonly="true"
          @click="popupShow"
        />
      </view>
      <slot name="customRight"></slot>
    </view>
    <nut-popup v-model:visible="show" position="bottom">
      <template v-if="customPicker">
        <nut-picker
          v-model="customData"
          class="pickerClass"
          :columns="columns"
          :title="pickerTitle"
          @confirm="customPpupConfirm"
          @cancel="popupClose"
        />
      </template>
      <template v-else>
        <nut-date-picker
          v-model="currentDate"
          :title="pickerTitle"
          :max-date="maxDate || maxThatDate"
          ok-text="确定"
          option-height="50"
          :is-show-chinese="true"
          visible-option-num="5"
          :three-dimensional="false"
          @confirm="popupConfirm"
          @cancel="popupClose"
        />
      </template>
    </nut-popup>
  </view>
</template>

<script>
import { defineComponent, nextTick, reactive, toRefs, watch } from 'vue';

import { getDateOfPreviousDay, getTnDate } from '@/utils/dateFormat.js';

export default defineComponent({
  name: 'KHeaderSearch',
  props: {
    /**
     * @description: 默认参数 code
     * @param
     * @author:
     */
    modelValue: {
      type: String || Array,
      default: '',
    },
    /**
     * @description: date-picker最大日期
     * @param
     * @author:
     */
    maxDate: {
      type: [Date, String],
      default: '',
    },
    /**
     * @description: picker列表数据
     * @param
     * @author:
     */
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * @description: input标签标题
     * @param
     * @author:
     */
    inputTitle: {
      type: String,
      default: () => {
        return '选择日期';
      },
    },
    /**
     * @description: picker标签标题
     * @param
     * @author:
     */
    pickerTitle: {
      type: String,
      default: () => {
        return '月份选择';
      },
    },
    /**
     * @description: 是否自定义picker组件
     * @param
     * @author:
     */
    customPicker: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  emits: ['popupConfirm', 'update:modelValue', 'changeCompositeProducts'],
  setup(props, context) {
    const state = reactive({
      customData: [],
      currentDate: new Date(),
      show: false,
      popupDesc: '',
      maxThatDate: new Date(getTnDate()),
    });

    // 提示 日期组件绑定的值为 中国标准格式的日期，如调用接口传参时需要转换正常格式 使用dateFormat中格式转换方法
    watch(
      () => props.modelValue,
      () => {
        nextTick(() => {
          if (props.customPicker) {
            state.customData = [];
            state.customData.push(props.modelValue);
            getTextByValue();
          } else {
            state.popupDesc = props.modelValue ? props.modelValue : getDateOfPreviousDay();
            state.currentDate = new Date(state.popupDesc);
          }
        });
      },
      { deep: true, immediate: true },
    );

    const getTextByValue = () => {
      for (const column of props.columns) {
        if (column.value === props.modelValue) {
          state.popupDesc = column.text;
        }
      }
    };

    const customPpupConfirm = ({ selectedOptions, selectedValue }) => {
      state.popupDesc = selectedOptions[0].text;
      state.show = false;
      context.emit('update:modelValue', selectedValue[0]);
      context.emit('popupConfirm', { popupDesc: state.popupDesc, selectedOptions });
    };
    // 确认按钮
    const popupConfirm = ({ selectedOptions }) => {
      state.popupDesc = selectedOptions.map((val) => val.value).join('-');
      state.show = false;
      context.emit('update:modelValue', state.popupDesc);
      context.emit('popupConfirm', { popupDesc: state.popupDesc, selectedOptions });
    };

    const popupClose = () => {
      state.show = false;
    };
    //  显示日期选择弹窗
    const popupShow = () => {
      state.show = true;
    };

    return {
      ...toRefs(state),
      popupClose,
      customPpupConfirm,
      popupConfirm,
      popupShow,
    };
  },
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  overflow: hidden;

  .formHeader {
    width: 100%;
    height: 96upx;
    display: flex;
    padding: 0;
    margin: 0;
    border-radius: 0;
    background: #fff;
    margin-bottom: 8upx;
  }

  .formHeader-date {
    height: 96upx;
    display: flex;
    flex: 1;
    justify-content: space-around;
    //background: yellow;
    //background: rgb(255,255,255);
    //255,255,255
    //253,253,253

    .inputTitle {
      display: inline-block;
      width: auto;
      font-size: 28upx;
      font-weight: 400;
      line-height: 44upx;
      text-align: center;
      padding: 26upx 0 26upx 24upx;
      white-space: nowrap;
    }

    :deep(.nut-input) {
      width: 75%;
      min-width: 240upx;
      border: 0;
      display: flex;
      align-items: center;
      background: #f5f6fa;
      margin: 20upx;
      padding: 20upx;
    }
  }
}

:deep(.nut-popup--bottom) {
  height: 660upx;
  overflow: hidden;
}

:deep(.nut-picker__bar) {
  height: 120upx;
  margin-bottom: 40upx;

  :deep(.nut-picker__left) {
    width: 64upx;
    height: 48upx;
    font-weight: 600;
    line-height: 48upx;
  }

  .nut-picker__title {
    width: 180upx;
    height: 56upx;
    font-weight: 600;
    line-height: 56upx;
  }

  :deep(.nut-picker__right) {
    width: 64upx;
    height: 50upx;
    font-weight: 600;
    line-height: 48upx;
  }
}

/* #ifdef MP-WEIXIN */
.box > :deep(view) {
  //width: 100%;
  //height: 96upx;
  //display: flex;
  padding: 0;
  //margin: 0;
  //border-radius: 0;
}

.formHeader-date > :deep(view) {
  flex: 1;
  width: 75%;
  min-width: 240upx;
  height: 64upx;
  color: var(--nut-title-color);
  background: var(--nut-help-color);
  border-radius: 8upx;
  padding: 10upx 24upx;
  margin: 16upx 24upx;
  line-height: 44upx;
}

/* #endif */
</style>
