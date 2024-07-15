<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-06 16:04
 * @FilePath: /src/components/KFluctuationText/KFluctuationText.vue
-->
<template>
  <span
    class="k-fluctuation-text"
    :class="['k-fluctuation-text-' + division]"
    :style="{
      'font-size': fontSize ? (typeof fontSize == 'string' ? fontSize : fontSize + 'px') : '',
      'text-decoration': division,
    }"
  >
    <!--
  左侧图标 [这里注释不要动]
--><template v-if="newValue !== empty">
      <template v-if="$slots.iconLeft">
        <!--
        --><span class="icon_left" :style="iconLeftColor ? { color: iconLeftColor } : textColor">
          <slot name="iconLeft" />
        </span>
        <!--
        -->
      </template>
      <template v-else-if="iconLeft.indexOf('u-icon-') !== -1">
        <!-- <el-icon class="icon_left" :style="iconLeftColor ? { 'color': iconLeftColor } : textColor" :class="iconLeft" /> -->
        <icon-font
          class="icon_left icon_left_ico"
          :style="iconLeftColor ? { color: iconLeftColor } : textColor"
          :name="iconLeft.replace('u-icon-', '')"
        />
      </template>
      <template v-else-if="iconLeft">
        <span class="icon_left" :style="iconLeftColor ? { color: iconLeftColor } : textColor">{{ iconLeft }}</span>
      </template>
    </template>
    <!--
    数值 [这里注释不要动]
 --><span class="k-fluctuation-text-inner num" :style="textColor">
      <template v-if="newValue !== empty">{{ newValue }}</template>
      <template v-else>
        <template v-if="$slots.empty">
          <slot name="empty" />
        </template>
        <template v-else>{{ empty }}</template>
      </template>
    </span>
    <!--
    右侧图标 [这里注释不要动]
 --><template v-if="newValue !== empty">
      <template v-if="$slots.iconRight">
        <span class="icon_right" :style="iconRightColor ? { color: iconRightColor } : textColor">
          <slot name="iconRight" />
        </span>
      </template>
      <template v-else-if="iconRight.indexOf('u-icon-') !== -1">
        <!-- <el-icon class="icon_right" :style="iconRightColor ? { 'color': iconRightColor } : textColor"
          :class="iconRight" /> -->
        <icon-font
          class="icon_right"
          :style="iconRightColor ? { color: iconRightColor } : textColor"
          :name="iconRight.replace('u-icon-', '')"
        />
      </template>
      <template v-else-if="iconRight">
        <span class="icon_right" :style="iconRightColor ? { color: iconRightColor } : textColor">{{ iconRight }}</span>
      </template>
    </template>
  </span>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';

export default defineComponent({
  name: 'KFluctuationText',
  props: {
    /**
     * @description: 数值
     * @param '14px' | 14
     * @author: zou hua
     */
    value: {
      type: [String, Number],
      require: true,
      default: '',
    },
    /**
     * @description: 字体大小
     * @param '14px' | 14
     * @author: zou hua
     */
    fontSize: {
      type: [String, Number],
      default: 'inherit',
    },
    /**
     * @description: 左侧图标
     * @param '●' | 带有 u-icon- 前缀标识，会到 nutui 自带的图标库查找
     * @author: zou hua
     */
    iconLeft: {
      type: String,
      default: '',
    },
    /**
     * @description: 左侧图标颜色
     * @param '#177DDC' | 'rgba(*,*,*,*)' | 'red'
     * @author: zou hua
     */
    iconLeftColor: {
      type: String,
      default: '',
    },
    /**
     * @description: 颜色库
     * @param ['',''] | ""
     * @author: zou hua
     */
    colors: {
      type: [Array, String],
      default: () => {
        // return [document.querySelector(':root').style.getPropertyValue('--up-color'), document.querySelector(':root').style.getPropertyValue('--lower-color')];

        // 如果确认变量名和定义方式都正确，但仍然无法获取到变量值，可能是因为该变量在样式计算之前没有被定义。在这种情况下，可以使用 getComputedStyle 方法获取 :root 元素的计算样式，然后从中获取变量值，例如：
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        return [computedStyle.getPropertyValue('--up-color'), computedStyle.getPropertyValue('--lower-color')];
      },
    },
    /**
     * @description: 右侧图标
     * @param '*' | 带有 u-icon- 前缀标识，会到 nutui 自带的图标库查找
     * @author: zou hua
     */
    iconRight: {
      type: String,
      default: '',
    },
    /**
     * @description: 右侧图标颜色
     * @param '#177DDC' | 'rgba(*,*,*,*)' | 'red'
     * @author: zou hua
     */
    iconRightColor: {
      type: String,
      default: '',
    },
    /**
     * @description: 分割线
     * @param 'none' | 'overline' | 'line-through' | 'underline'
     * @author: zou hua
     */
    division: {
      type: String,
      default: 'none',
    },
    /**
     * @description: 空状态标识
     * @param '-' | '*'
     * @author: zou hua
     */
    empty: {
      type: String,
      default: '--',
    },
    /**
     * @description: 过滤名单
     * @param '' | Number(*) | [] | true | false
     * @author: zou hua
     */
    skip: { type: [String, Number, Array, Boolean] },
    /**
     * @description: 保留 n 位数。超过 n 位截取保留 n 位，不足 n 位补足0
     * @param '' | Number(*) | true | false
     * @author: zou hua
     */
    float: { type: [String, Number, Boolean] },
    /**
     * @description: 0 颜色设置
     * @param 'rise' | 'fall' | '#177DDC' | 'rgba(*,*,*,*)' | 'red'
     * @author: zou hua
     */
    zeroColor: { type: [String, Boolean] },
  },
  setup(props) {
    const state = reactive({
      // 字体颜色
      textColor: '',
      // 新值
      newValue: '',
    });
    watch(
      () => props.value,
      () => {
        dataFiltering();
      },
      { deep: true },
    );
    /**
     * @description: 颜色过滤
     * @return []
     * @author: zou hua
     */
    const colorsFilter = () => {
      let colorArr;
      if (Array.isArray(props.colors)) {
        colorArr = props.colors;
      } else {
        colorArr = props.colors.split(',');
      }

      const arr = [];
      colorArr.forEach((item) => {
        arr.push(`color: ${item}`);
      });

      return arr;
    };
    /**
     * @description: 数据过滤
     * @return []
     * @author: zou hua
     */
    const dataFiltering = () => {
      const tempValue = JSON.parse(JSON.stringify(props.value));
      if (props.skip === 'NotEmpty') {
        // 仅作非空判断
        if (tempValue && tempValue !== '-' && tempValue !== '--' && tempValue !== 'undefined' && tempValue !== 'null') {
          state.newValue = tempValue;
        } else {
          state.newValue = props.empty;
        }
      } else if (
        (tempValue || String(tempValue) === '0') &&
        tempValue !== '-' &&
        tempValue !== '--' &&
        tempValue !== 'undefined' &&
        tempValue !== 'null' &&
        (typeof tempValue === 'string' || typeof tempValue === 'number')
      ) {
        let newValue;
        if (typeof tempValue === 'string') {
          // 字符串
          // newValue = Number(tempValue.match(/\d+/g).join(''))
          // const regEx = /[^\d|^\\.|^\\-]/g;
          const regEx = /[^\d.|\\-]/g;

          const value = tempValue.replace(regEx, '');
          // // // console.log('newValuenewValue')
          // // // console.log(newValue)

          if (
            value === '-0.0' ||
            value === '-0.00' ||
            value === '-0.000' ||
            value === '-0.0000' ||
            value === '-0.00000' ||
            value === '-0.000000' ||
            value === '-0.0000000' ||
            value === '-0.0000000'
          ) {
            newValue = value;
            state.newValue = value;
            // 0 颜色改成红色
            if (props.zeroColor) {
              const newColors = colorsFilter();
              if (props.skip) {
                let skip = false;
                if (Array.isArray(props.skip)) {
                  for (let i = 0; i <= props.skip.length; i++) {
                    if (props.skip[i] === newValue) {
                      skip = true;
                      break;
                    }
                  }
                } else if (typeof props.skip === 'boolean') {
                  skip = true;
                } else if (props.skip === newValue) {
                  skip = true;
                }
                if (!skip) {
                  state.textColor = newColors[1];
                }
              } else {
                state.textColor = newColors[1];
              }

              if (props.zeroColor === 'rise' || typeof props.zeroColor === 'boolean') {
                state.textColor = newColors[0];
              } else if (props.zeroColor === 'fall') {
                state.textColor = newColors[1];
              } else {
                state.textColor = { color: props.zeroColor };
              }
            }
            return false;
          }
          newValue = getFloat(value);

          // newValue = Number(tempValue)
        } else {
          // 数字
          newValue = getFloat(tempValue);
        }
        // // // console.log('newValue')
        // // // console.log(newValue)
        if (!Object.is(newValue, NaN)) {
          if (props.skip === 'Money') {
            state.newValue = analysis(newValue);
            return false;
          }
          if (props.skip === 'Number') {
            state.newValue = analysis(newValue, false);
            return false;
          }
          if (props.skip === 'FluctuationMoney') {
            state.newValue = analysis(newValue);
          } else {
            state.newValue = getFloat(newValue);
          }
          const newColors = colorsFilter();

          if (props.skip) {
            let skip = false;
            if (Array.isArray(props.skip)) {
              for (let ni = 0; ni <= props.skip.length; ni++) {
                if (props.skip[ni] === newValue) {
                  skip = true;
                  break;
                }
              }
            } else if (typeof props.skip === 'boolean') {
              skip = true;
            } else if (props.skip === newValue) {
              skip = true;
            }
            if (!skip) {
              if (props.zeroColor) {
                if (props.zeroColor === 'rise' || typeof props.zeroColor === 'boolean') {
                  state.textColor = newColors[0];
                } else if (props.zeroColor === 'fall') {
                  state.textColor = newColors[1];
                } else {
                  state.textColor = { color: props.zeroColor };
                }
              }

              if (newValue > 0) {
                state.textColor = newColors[0];
              } else if (newValue < 0) {
                state.textColor = newColors[1];
              }
            }
          } else {
            if (props.zeroColor) {
              if (props.zeroColor === 'rise' || typeof props.zeroColor === 'boolean') {
                state.textColor = newColors[0];
              } else if (props.zeroColor === 'fall') {
                state.textColor = newColors[1];
              } else {
                state.textColor = { color: props.zeroColor };
              }
            }

            if (newValue > 0) {
              state.textColor = newColors[0];
            } else if (newValue < 0) {
              state.textColor = newColors[1];
            }
          }
        } else {
          if (props.skip === 'FluctuationMoney') {
            state.textColor = props.zeroColor;
          }
          state.newValue = props.empty;
        }
      } else {
        if (props.skip === 'FluctuationMoney') {
          state.textColor = props.zeroColor;
        }
        state.newValue = props.empty;
      }
      return null;
    };
    /**
     * @description: 保留n 位数。超过4位截取保留4位，不足4位补足0
     * @author: zou hua
     */
    const getFloat = (number) => {
      if (props.float) {
        let n;
        if (typeof props.float === 'boolean') {
          n = 4;
        } else {
          n = props.float;
        }
        n = n ? parseInt(n, 10) : 0;
        if (n <= 0) {
          return Math.round(number);
        }
        number = Math.round(number * 10 ** n) / 10 ** n; // 四舍五入
        number = Number(number).toFixed(n); // 补足位数
      }
      return number;
    };
    /**
     * @description: 金额数字添加分隔符    输出格式 000,000,000.00
     * @author: zou hua
     */
    const analysis = (opt, type = true) => {
      if (opt) {
        const str = `${opt}`; // 把数字变成string类型
        if (str.indexOf('.') !== -1) {
          // 判断是否附带小数
          const intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ','); // 取到整数部分
          let dot = str.substring(str.length, str.indexOf('.')); // 取到小数部分搜索
          // 不足2位补0
          if (dot.length === 1) {
            dot += '00';
          } else if (dot.length === 2) {
            dot += '0';
          }
          return intSum + dot;
        }
        const ret = str.replace(/\B(?=(?:\d{3})+$)/g, ',');
        return ret + (type ? '.00' : '');
      }
      return type ? '0.00' : '0';
    };
    onMounted(() => {
      dataFiltering();
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.k-fluctuation-text {
  position: relative;
  text-decoration: none;
  outline: 0;
  padding: 0;
  line-height: 1;
  margin: 0;

  &.ellipsis {
    display: inline-block;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;

    .k-fluctuation-text-inner {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .icon_left {
    padding-right: 0;
  }

  .icon_right {
    padding-left: 0;
  }

  .icon_left,
  .icon_right {
    position: relative;
    left: 0;
    top: 0;
  }

  .icon_left_ico {
    top: 4px;
  }
}
</style>
