<!--
 * @Description: DownChoice
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-05 16:44
 * @FilePath: /src/components/kDownChoice/kDownChoice.vue
-->
<template>
  <view :class="['down_choice', key]">
    <nut-menu class="product_search_box" :direction="direction" custom-class="menu">
      <template #icon>
        <nut-icon name="triangle-down"></nut-icon>
      </template>
      <nut-menu-item
        ref="listDataRef"
        :title="productTitle || `请选择${placeholderName}`"
        :cols="2"
        @close="changeCompositeproduct"
      >
        <template #icon>
          <nut-icon name="checked"></nut-icon>
        </template>
        <view class="options_search_box">
          <!-- 搜索条件 -->
          <nut-searchbar
            v-if="isSearch"
            v-model="listDataearchValue"
            :placeholder="`请输入${placeholderName}`"
            @clear="filterData"
            @blur="filterData(1)"
            @change="filterData"
          >
            <template #leftin>
              <img class="search-searchicon" src="@/images/icon/search@2x.png" alt="" />
            </template>
            <template #clear-icon>
              <img class="search-searchicon" src="@/images/icon/clear@2x.png" alt="" />
            </template>
          </nut-searchbar>
          <view class="options_list">
            <!-- 列表 -->
            <nut-infinite-loading v-model="infinityValue" :has-more="hasMore" @load-more="loadMore">
              <k-loading v-if="listDataOptionsLoading" height="245px" style="position: relative" />
              <template v-else-if="listDataOptions && listDataOptions.length > 0 && !listDataOptionsLoading">
                <div v-for="(item, index) in listDataOptions" :key="index" class="infiniteLi">
                  <template v-if="selectType === 'more'">
                    <!-- 多选 -->
                    <view
                      class="options_list_li f28"
                      :class="{ active: checkboxgroup.includes(item.code) }"
                      @click="moreVheckboxFn(item)"
                    >
                      <view>
                        <span v-html="item.name" />
                        <template v-if="item.codeId"> （{{ item.codeId }}） </template>
                      </view>
                      <view v-if="selectType === 'more'">
                        <view>
                          <!-- 选中 -->
                          <nut-icon v-if="checkboxgroup.includes(item.code)" name="checked"></nut-icon>
                          <!-- 禁用 -->
                          <nut-icon
                            v-else-if="
                              maxOptions !== -1
                                ? !checkboxgroup.includes(item.code) && checkboxgroup.length >= maxOptions
                                : false
                            "
                            name="check-disabled"
                            custom-color="rgba(0, 0, 0, 0.25)"
                          ></nut-icon>
                          <!-- 未选中 -->
                          <nut-icon v-else name="check-normal" custom-color="rgba(0, 0, 0, 0.25)"></nut-icon>
                        </view>
                      </view>
                    </view>
                  </template>
                  <template v-else>
                    <!-- 单选 -->
                    <view
                      class="options_list_li f28"
                      :class="{ active: item.code === templistDataValue }"
                      @click="optionsFn(item)"
                    >
                      <view class="text">
                        {{ item.name }}
                        <template v-if="item.codeId"> （{{ item.codeId }}） </template>
                      </view>
                      <view>
                        <!-- 选中 -->
                        <nut-icon v-if="item.code === templistDataValue" name="checked"></nut-icon>
                        <!-- 未选中 -->
                        <nut-icon v-else name="check-normal" custom-color="rgba(0, 0, 0, 0.25)"></nut-icon>
                      </view>
                    </view>
                  </template>
                </div>
              </template>
              <k-empty v-else style="height: 245px" />
            </nut-infinite-loading>
          </view>
        </view>
      </nut-menu-item>
    </nut-menu>
  </view>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';

import { debounce } from '@/utils/throttle.js';

export default defineComponent({
  name: 'KDownChoice',
  props: {
    /**
     * @description: 展开方向
     * @param
     * @author:
     */
    direction: {
      type: String,
      default: 'down',
    },
    /**
     * @description: 日期
     * @param
     * @author:
     */
    date: {
      type: String,
      default: '',
    },
    /**
     * @description: 是否支持模糊搜索
     * @param
     * @author:
     */
    isSearch: {
      type: Boolean,
      default: true,
    },
    /**
     * @description: 跳转详情页面参数 o: 组合， p: 产品, i:行业, i:行业, s:股票, q:指数
     * @param
     * @author:
     */
    type: {
      type: String,
      default: '',
    },
    /**
     * @description: 列表数据 所需参数 { name: '', code: ''}
     * @param
     * @author:
     */
    additional: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * @description: 选择方式 more: 多选， radio: 单选
     * @param
     * @author:
     */
    selectType: {
      type: String,
      default: 'radio',
    },
    /**
     * @description: 最大选择数量  多选可用
     * @param
     * @author:
     */
    maxOptions: {
      type: Number,
      default: -1,
    },
    /**
     * @description: 数据每次加载 n 条数据
     * @param
     * @author:
     */
    loadCount: {
      type: Number,
      default: 50,
    },
    /**
     * @description: 是否可以为空
     * @param
     * @author:
     */
    isEmpty: {
      type: Boolean,
      default: false,
    },
    /**
     * @description: 占位符内容
     * @param
     * @author:
     */
    placeholderName: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(props, context) {
    // const { proxy } = getCurrentInstance();
    const listDataRef = ref('');
    const params = toRefs(props);
    const state = reactive({
      key: '',
      // 列表最大高度
      containerHeight: 400,
      // 多选值
      checkboxgroup: [],
      // 多选值(临时)
      // tempCheckboxgroup: [],
      // 临时列表数据选中值
      templistDataValue: '',
      // 列表数据搜索内容
      listDataearchValue: '',
      // 列表数据标题
      productTitle: '',
      // 临时列表数据标题
      tempProductTitle: '',
      // 列表数据选中值
      listDataValue: 0,
      // 列表选项-加载
      listDataOptionsLoading: false,
      // 列表数据选项
      listDataOptions: [],
      // 临时列表数据选项--分页数据
      tempListDataOptionsPaging: [],
      // 当前分页下标
      tahtPagingIndex: 0,
      // 是否还有更多数据
      hasMore: true,
      // 是否触发滚动加载
      infinityValue: false,
    });
    /**
     * @description 初始化组件，过滤数据 获取name，code
     * */
    const init = () => {
      let name = params.additional.value.name;

      let code = params.additional.value.code;
      if (props.selectType === 'more') {
        // 多选
        state.templistDataValue = [];
        state.tempProductTitle = [];
        if (params.additional.value && params.additional.value.name && params.additional.value.code) {
          name = params.additional.value.name.split(',');
          code = params.additional.value.code.split(',');
        }
      }

      if (params.additional.value && params.additional.value.name && params.additional.value.code) {
        state.checkboxgroup = code;
        state.tempProductTitle = JSON.parse(JSON.stringify(name));
        state.listDataValue = JSON.parse(JSON.stringify(code));

        state.templistDataValue = JSON.parse(JSON.stringify(code));
        // state.listDataType = JSON.parse(JSON.stringify(params.type.value));
        // state.templistDataType = JSON.parse(JSON.stringify(params.type.value));
      }
    };
    const filterData = debounce(function debounceFunction(way) {
      state.tahtPagingIndex = 0;
      getDataList(way);
    }, 1000);
    /**
     * @description 数据列表获取，通过某个参数进行接口调用
     */
    const getDataList = (source) => {
      // 判断要不要启动loading 动画
      state.listDataOptionsLoading = source === '1' || source === 1;
      getSWIndustry();
    };
    /**
     * @description 调用接口  获取下拉数据列表
     * */
    const getSWIndustry = () => {
      const data = [
        {
          code: '740000',
          label: '煤炭',
        },
        {
          code: '110000',
          label: '农林牧渔',
        },
        {
          code: '220000',
          label: '基础化工',
        },
        {
          code: '230000',
          label: '钢铁',
        },
        {
          code: '240000',
          label: '有色金属',
        },
        {
          code: '270000',
          label: '电子',
        },
        {
          code: '280000',
          label: '汽车',
        },
        {
          code: '330000',
          label: '家用电器',
        },
        {
          code: '340000',
          label: '食品饮料',
        },
        {
          code: '350000',
          label: '纺织服饰',
        },
        {
          code: '360000',
          label: '轻工制造',
        },
        {
          code: '370000',
          label: '医药生物',
        },
        {
          code: '410000',
          label: '公用事业',
        },
        {
          code: '420000',
          label: '交通运输',
        },
        {
          code: '430000',
          label: '房地产',
        },
        {
          code: '450000',
          label: '商贸零售',
        },
        {
          code: '460000',
          label: '社会服务',
        },
        {
          code: '480000',
          label: '银行',
        },
        {
          code: '490000',
          label: '非银金融',
        },
        {
          code: '510000',
          label: '综合',
        },
        {
          code: '610000',
          label: '建筑材料',
        },
        {
          code: '620000',
          label: '建筑装饰',
        },
        {
          code: '630000',
          label: '电力设备',
        },
        {
          code: '640000',
          label: '机械设备',
        },
        {
          code: '650000',
          label: '国防军工',
        },
        {
          code: '710000',
          label: '计算机',
        },
        {
          code: '720000',
          label: '传媒',
        },
        {
          code: '730000',
          label: '通信',
        },
        {
          code: '750000',
          label: '石油石化',
        },
        {
          code: '760000',
          label: '环保',
        },
        {
          code: '770000',
          label: '美容护理',
        },
      ];
      data.forEach((item) => {
        item.name = item.label;
      });
      additionalCctionsStart(data || []);
      // proxy.$Api
      //   .swIndustry(query)
      //   .then(({ data }) => {
      //     data.forEach((item) => {
      //       item.name = item.label;
      //     });
      //     additionalCctionsStart(data || []);
      //   })
      //   .finally(() => {
      //     // 数据加载结束-附加操作
      //     additionalCctionsEnd();
      //   });
      additionalCctionsEnd();
    };
    /**
     * @description 根据subGroupLength，获取subGroupLength条数据
     * */
    const group = (array = [], subGroupLength = 0) => {
      let index = 0;
      const newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    };
    /**
     * decs:拼接过滤数据
     * */
    const additionalCctionsStart = (listDate) => {
      // 拆分数据量由 props.loadCount 决定
      state.tempListDataOptionsPaging = group(listDate, props.loadCount);

      if (state.tempListDataOptionsPaging?.length <= 1) {
        // 只有1页
        state.hasMore = false;
        state.infinityValue = true;
      } else {
        state.hasMore = true;
      }

      // 将第一页赋值
      state.listDataOptions = state.tempListDataOptionsPaging[state.tahtPagingIndex];
      state.listDataOptionsLoading = false;
    };
    /**
     * @description 接口执行不成功执行
     * */
    const additionalCctionsEnd = () => {
      // 将临时存储的选择状态在还回去
      state.listDataOptionsLoading = false;
    };
    /**
     * @description 加载更多
     * */
    const loadMore = () => {
      state.tahtPagingIndex++;
      if (state.tempListDataOptionsPaging[state.tahtPagingIndex]) {
        // state.hasMore = true;
        const newArr = state.tempListDataOptionsPaging[state.tahtPagingIndex];
        state.listDataOptions = state.listDataOptions.concat(newArr);
      } else {
        state.hasMore = false;
      }
      state.infinityValue = false;
    };
    /**
     * @description downchoice组件关闭后的回调
     * */
    const changeCompositeproduct = () => {
      if (state.templistDataValue !== state.listDataValue) {
        state.listDataValue = state.templistDataValue;
        state.listDataType = state.templistDataType || params.type.value;

        // 设置标题
        setTitle();
        context.emit('close', {
          name: JSON.parse(JSON.stringify(props.selectType === 'more' ? state.tempProductTitle : state.productTitle)),
          code: JSON.parse(JSON.stringify(state.listDataValue)),
          type: JSON.parse(JSON.stringify(state.listDataType)),
        });
      }
    };
    /**
     * @description 设置标题占位信息
     * */
    const setTitle = () => {
      if (props.selectType === 'more') {
        // 多选
        const nameArr = state.tempProductTitle;
        const title = nameArr[0] ? nameArr[0].replace(/&nbsp;/g, '') : '';
        let num = 0;
        if (state.checkboxgroup.length > 0) {
          if (nameArr.length > 1) {
            if (nameArr.length > 99) {
              num = '99+';
            } else {
              num = `+${nameArr.length - 1}`;
            }
          }
        }
        if (title) {
          state.productTitle = title + (num === 0 ? '' : '(') + (num === 0 ? '' : num) + (num === 0 ? '' : ')');
        } else {
          state.productTitle = '';
        }
      } else {
        // 单选
        state.productTitle = state.tempProductTitle;
      }
    };
    /**
     * @description 单选模式选中
     * */
    const optionsFn = (item) => {
      if (state.templistDataValue === item.code && props.isEmpty) {
        state.templistDataType = '';
        state.templistDataValue = '';
        state.tempProductTitle = '';
      } else {
        state.templistDataType = item.type;
        state.templistDataValue = item.code;
        state.tempProductTitle = item.name;
      }
      listDataRef.value.toggle();
    };
    /**
     * @description 多选模式选中
     * */
    const moreVheckboxFn = (row) => {
      if (state.checkboxgroup.length === 0) {
        state.tempProductTitle = [];
      }
      if (state.checkboxgroup.includes(row.code)) {
        const codeArr = state.checkboxgroup.filter((item) => item !== row.code);
        const splitName = row.name.split(';');
        const nameArr = state.tempProductTitle.filter((item) => item !== splitName[splitName.length - 1]);
        // let nameArr = state.tempProductTitle.filter(item => !row.name.includes(item) );
        state.checkboxgroup = codeArr;
        state.templistDataValue = codeArr;
        state.tempProductTitle = nameArr;
      } else if (props.maxOptions !== -1 && state.checkboxgroup.length >= props.maxOptions) {
        return false;
      } else {
        state.checkboxgroup = state.checkboxgroup.concat(row.code);
        state.templistDataValue = state.templistDataValue.concat(row.code);
        state.tempProductTitle = state.tempProductTitle.concat(row.name);
      }

      // 设置标题;
      setTitle();
      return null;
    };
    onMounted(() => {
      setTimeout(() => {
        // 生成key值，确保当一个页面有多个相同组件时，dom获取不会出错
        const currentDate = new Date();
        const timestamp = currentDate.getTime(); // 获取当前时间戳，单位为毫秒
        state.key = `DC${timestamp}`;
        init();
        setTitle();
        getDataList();
      });
    });
    return {
      ...toRefs(state),
      listDataRef,
      filterData,
      changeCompositeproduct,
      loadMore,
      optionsFn,
      moreVheckboxFn,
    };
  },
});
</script>

<style scoped lang="scss">
.down_choice {
  max-width: 100%;

  .downIcon {
    width: 18upx !important;
  }

  :deep(.nut-menu) {
    .nut-menu__bar {
      box-shadow: none;

      .nut-menu__item {
        .nut-menu__title {
          //height: 64upx;
          //justify-content: end;
          padding-right: 24upx;

          .nut-menu__title-text {
            color: $title-color;

            .nut-menu__title-text-span {
              height: 28upx;
              font-size: 20upx;
              font-weight: 400;
              color: #f52f3e;
              background: #ffe3ea;
              border-radius: 4px;
              padding: 0 8upx;
              margin-left: 8upx;
            }
          }
        }
      }

      .nut-menu__title-icon svg {
        width: 18upx;
      }
    }
  }

  .search-searchicon {
    width: 32upx;
    height: 32upx;
  }

  :deep(.nut-popup .nut-menu-item__content) {
    padding: 0;
    max-height: 70vh;

    .options_search_box {
      min-height: 245px;
      width: 100%;

      .nut-searchbar {
        height: 98upx;
        padding: 16upx 24upx;
        position: sticky;
        left: 0;
        top: 0;
        opacity: 1;
        z-index: 10;
        border-top: 1upx solid rgb(0 0 0 / 6%);
        border-bottom: 1upx solid rgb(0 0 0 / 6%);

        &::after {
          content: ' ';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: rgb(0 0 0 / 6%);
        }

        .nut-searchbar__input-clear {
          color: rgb(0 0 0 / 15%);
        }

        .nut-searchbar__search-input {
          height: 64upx;
          border-radius: 4px;
          background: $help-color;
        }

        .search-searchicon {
          width: 32upx;
          height: 32upx;
        }
      }
    }
  }

  :deep(.nut-infinite__bottom) {
    display: none;
  }

  :deep(.options_search_box) {
    width: 100%;

    .options_list {
      width: 100%;

      .nut-list-item {
        height: 96upx;
        margin: 0;
        border-bottom: 1upx solid rgb(0 0 0 / 6%);
      }

      .options_list_li {
        display: flex;
        justify-content: space-between;
        height: 80upx;
        color: $title-color;
        align-items: center;
        margin: 0 24upx;
        position: relative;
        left: 0;
        top: 0;

        .nut-icon {
          vertical-align: middle;
        }

        &::after {
          content: ' ';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: rgb(0 0 0 / 6%);
        }

        &.active {
          .name {
            color: $primary-color;
          }
        }

        .name {
          color: $primary-color;
          font-size: 28upx;
          font-weight: 400;
          line-height: 44upx;
        }
      }
    }
  }
}
</style>
