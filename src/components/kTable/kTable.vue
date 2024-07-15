<!--
 * @Description: k-table
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-04 13:42
 * @FilePath: /src/components/kTable/kTable.vue
-->
<template>
  <view class="out">
    <k-loading v-if="loading" height="400upx" />
    <view class="inner" :style="`max-height: ${height ? height : '400upx'}`">
      <table :class="['tableClass', customRow ? 'customClass' : '']">
        <thead v-if="showHeader" class="tableHeaderClass">
          <tr>
            <th
              v-for="(item, index) in columns"
              :key="index"
              :style="{ width: item.width ? item.width : 'none', minWidth: item.width ? item.width : 'none' }"
              class="thClass"
            >
              <template v-if="formatted(item.key + 'Column')">
                <slot :name="`${item.key}Column`" :row="item" />
              </template>
              <template v-else>
                {{ item.title }}
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index" class="tableTdClass" @click="rowClick(item, index)">
            <template v-if="customRow">
              <td>
                <slot name="customRow" :row="item" />
              </td>
            </template>
            <template v-else>
              <td v-for="(itemC, indexC) in columns" :key="indexC" :style="`background:${item.color || 'white'}`">
                <view v-if="formatted(itemC.key)">
                  <slot :name="itemC.key" :row="item" />
                </view>
                <view v-else>
                  <p class="tdText">
                    {{ emptyCheck(item[itemC.key]) }}
                  </p>
                </view>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <template v-if="tableData.length === 0">
        <template v-if="formatted('nodata')">
          <slot name="nodata" />
        </template>
        <template v-else>
          <k-empty />
        </template>
      </template>
    </view>
  </view>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, useSlots } from 'vue';

export default defineComponent({
  name: 'KTable',
  props: {
    /**
     * @description: loading加载
     * @param
     * @author:
     */
    loading: {
      type: Boolean,
      require: true,
      default: true,
    },
    /**
     * @description: 表头columns
     * @param
     * @author:
     */
    columns: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    /**
     * @description: 表格数据内容
     * @param
     * @author:
     */
    tableData: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    /**
     * @description: 表格高度
     * @param
     * @author:
     */
    height: {
      type: String,
      required: false,
      default: () => {
        return '';
      },
    },
    /**
     * @description: 数据为空时，展示图片名称
     * @param
     * @author:
     */
    imageName: {
      type: String,
      required: false,
      default: () => {
        return '';
      },
    },
    /**
     * @description: 是否展示表头
     * @param
     * @author:
     */
    showHeader: {
      type: Boolean,
      require: false,
      default: true,
    },
    /**
     * @description: 是否自定义表格
     * @param
     * @author:
     */
    customRow: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  emits: ['rowClick'],
  setup(props, context) {
    const state = reactive({ useslots: useSlots() });

    const formatted = computed(() => {
      return (key) => {
        return useSlots()[key];
      };
    });

    const rowClick = (row, index) => {
      context.emit('rowClick', { row, index });
    };

    const emptyCheck = computed(() => {
      return (value) => {
        if (value === '' || value === null || value === undefined) {
          return '--';
        }
        return value;
      };
    });

    return {
      ...toRefs(state),
      formatted,
      rowClick,
      emptyCheck,
    };
  },
});
</script>

<style lang="scss" scoped>
.out {
  position: relative;
  //min-height: 400upx;

  .inner {
    overflow: auto;
    height: 100%;

    /* 设置固定高度 */
    width: 100%;
    //position: absolute;

    .thClass {
      height: 30upx;
      padding: 5px;
      position: sticky;
      top: -1px;

      /* 首行永远固定在头部  */
      background-color: #f5f6fa;

      /* 设置表头背景色 */
      font-size: 24upx;
    }

    td:first-child {
      position: sticky;
      left: -2px;

      /* 首列永远固定在左侧 */
      z-index: 1;
      background-color: white;
    }

    .thClass:first-child {
      position: sticky;
      left: -2px;

      /* 首列永远固定在左侧 */
      z-index: 2;

      /* 表头的首列要在上面 */
    }
  }
}

.customClass {
  td:first-child {
    position: relative !important;
  }
}

:deep(.tableClass) {
  min-width: 100%;
  border-collapse: collapse;
  overflow: auto;

  /* 垂直滚动 */
  .tableHeaderClass {
    text-align: left;
    color: #7b8299;
    background-color: #f5f6fa;
    font-size: 20upx;

    .thClass {
      padding: 14upx 24upx;
      font-weight: 500;
      z-index: 1;
    }
  }

  .tableTdClass {
    border-bottom: 2px solid #f5f6fa;

    .tdText {
      font-size: 28upx;
      font-weight: 400;
      padding: 16upx 24upx;
      color: var(--nut-title-color);
    }
  }

  .emptyClass {
    width: 100%;
  }
}
</style>
