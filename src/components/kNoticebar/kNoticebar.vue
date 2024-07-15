<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-08 09:29
 * @FilePath: /src/components/kNoticebar/kNoticebar.vue
-->
<template>
  <view class="box mb12">
    <!--
      横向
    -->
    <view v-if="direction === 'across'" :class="hideLeftIcon ? 'hideLeftIcon' : ''">
      <nut-noticebar
        :class="{ acrossClass: true, wrapClass: wrapable }"
        :text="text === '' ? '暂无消息提醒！' : text"
        :scrollable="scrollable"
        :close-mode="closeMode"
        :wrapable="wrapable"
        :direction="direction"
        :color="color"
        :background="background"
        :delay="delay"
        :speed="speed"
        @click="noticeBarClick"
        @close="close()"
        @across-end="acrossEnd"
      >
        <template v-if="customLeftIcon" #left-icon>
          <slot name="leftIcon" />
        </template>
        <template v-if="customRightIcon" #right-icon>
          <slot name="rightIcon" />
        </template>
      </nut-noticebar>
    </view>
    <!--
      纵向
    -->
    <view v-else-if="direction === 'vertical'" class="verticalBox bg-white">
      <nut-noticebar
        class="verticalClass"
        :list="list"
        :scrollable="scrollable"
        :close-mode="closeMode"
        :wrapable="wrapable"
        :direction="direction"
        :color="color"
        :background="background"
        :delay="delay"
        :speed="speed"
        :stand-time="list.length === 1 ? 9999999999999 : standTime"
        :complex-am="true"
        @click="noticeBarClick"
        @close="close"
        @across-end="acrossEnd"
      >
        <template v-if="customRightIcon" #right-icon>
          <slot name="rightIcon" />
        </template>
      </nut-noticebar>
      <view class="verticalLeftIconClass">
        <slot name="leftIcon" />
      </view>
    </view>
    <!--
      纵向轮播图
    -->
    <view v-else-if="direction === 'swiper'" class="swiperNoticeBar">
      <nut-noticebar class="swiperClass" :scrollable="false" :wrapable="true" :background="background" :color="color">
        <template v-if="customLeftIcon" #left-icon>
          <slot name="leftIcon" />
        </template>
        <template #default>
          <div class="swiperOut">
            <div v-if="quickNewsList.length > 0" class="swiperInner">
              <slot v-if="slotsCustom" name="custom" :row="quickNewsList" />
              <template v-else>
                <div v-for="(item, key) in quickNewsList" :key="key" class="swiperItem">
                  <p class="swiperTitle">
                    {{ item.title }}
                  </p>
                  <p class="swiperTime">
                    {{ item.time }}
                  </p>
                </div>
              </template>
            </div>
            <div v-else class="tc" style="">
              {{ emptyPlaceholder }}
            </div>
          </div>
        </template>
      </nut-noticebar>
    </view>
  </view>
</template>

<script>
import { onShow } from '@dcloudio/uni-app';
import { defineComponent, nextTick, onBeforeUnmount, reactive, toRefs, useSlots, watch } from 'vue';

import store from '@/store';

export default defineComponent({
  name: 'KNoticebar',
  props: {
    /**
     * @description:  是否左侧icon图标
     */
    hideLeftIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * @description:  是否自定义左侧icon图标
     */
    customLeftIcon: {
      type: Boolean,
      default: false,
    },
    //
    /**
     * @description:  是否自定义右侧icon图标
     */
    customRightIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * @description:  展示数据
     */
    dataList: {
      type: [Array, String],
      default: '',
    },
    /**
     * @description:  是否是否循环播放
     */
    scrollable: {
      type: Boolean,
      default: false, // across 横向滚动、vertical 纵向滚动
    },
    /**
     * @description:  是否展示关闭按钮
     */
    closeMode: {
      type: Boolean,
      default: false,
    },
    //  自定义图片
    //  链接模式
    /**
     * @description:  是否折行展示
     */
    wrapable: {
      type: Boolean,
      default: false,
    },
    /**
     * @description:  纵向滚动(across/横、vertical/纵、swiper/轮播图)
     */
    direction: {
      type: String,
      default: 'across',
    },
    /**
     * @description:  导航栏的文字颜色
     */
    color: {
      type: String,
      default: '',
    },
    /**
     * @description:  背景颜色
     */
    background: {
      type: String,
      default: '',
    },
    //
    /**
     * @description:  延时多少秒
     */
    delay: {
      type: [Number, String],
      default: 1,
    },
    /**
     * @description:  速度多少秒
     */
    speed: {
      type: Number,
      default: 10,
    },
    /**
     * @description:  停留时间(毫秒)
     */
    standTime: {
      type: Number,
      default: 2000,
    },
    /**
     * @description:  展示条数
     */
    maxLength: {
      type: Number,
      default: 2,
    },
    /**
     * @description:  为空文字
     */
    emptyPlaceholder: {
      type: String,
      default: '暂无数据',
    },
    /**
     * @description:  轮播图滚动方式
     * default 默认根据最大数据长度滚动
     * seamless 无缝衔接
     */
    swiperDirection: {
      type: String,
      default: 'default',
    },
  },
  emits: ['noticeBarClick', 'close', 'acrossEnd'],
  setup(props, content) {
    let count = 0;
    const state = reactive({
      // 判断 slot custom 是否有传值
      slotsCustom: !!useSlots().custom,
      text: '',
      list: [],
      direction: '',
      currentPageIndex: 0,
      quickNewsList: [],
      allNewsList: [],
      swiperInterval: null,
    });
    // 外层点击事件回调
    const noticeBarClick = () => {
      content.emit('noticeBarClick');
    };
    // 关闭通知栏时触发
    const close = () => {
      // console.log('close');
      content.emit('close');
    };
    // 横向滚动结束时触发
    const acrossEnd = (item) => {
      // console.log('acrossEnd');
      content.emit('acrossEnd', item);
    };
    const swiperTrans = () => {
      console.log('定时任务111');
      if (state.swiperInterval) {
        clearInterval(state.swiperInterval);
      }
      if (state.quickNewsList.length === 0) return;
      // 判断数据条数是否支持滚动
      if (state.quickNewsList.length <= props.maxLength) {
        console.log('数据条数不支持滚动', state.quickNewsList.length, props.maxLength);
        // 数据条数不支持滚动
        const swiperInner = document.getElementsByClassName('swiperInner')[0];
        const swiperItem = document.getElementsByClassName('swiperItem')[0];
        swiperInner.style.height = `${swiperItem.getBoundingClientRect().height * state.quickNewsList.length}px`;
        const swiperOut = document.getElementsByClassName('swiperOut')[0];
        swiperOut.style.height = `${swiperItem.getBoundingClientRect().height * state.quickNewsList.length}px`;
        return;
      }
      // 计算总页数
      const allPage = Math.ceil(state.quickNewsList.length / props.maxLength);
      // 获取元素
      const swiperInner = document.getElementsByClassName('swiperInner')[0];
      const swiperItem = document.getElementsByClassName('swiperItem')[0];
      if (swiperInner && swiperItem) {
        swiperInner.style.height = `${swiperItem.getBoundingClientRect().height * props.maxLength}px`;
        // 开启动画
        swiperInner.style.transitionDuration = '1000ms';
        // 获取可是窗口高度
        const swiperOut = document.getElementsByClassName('swiperOut')[0];
        swiperOut.style.height = `${swiperItem.getBoundingClientRect().height * props.maxLength}px`;

        console.log('props.swiperDirection', props.swiperDirection);
        if (props.swiperDirection === 'seamless') {
          console.log('无缝滚动');
          // 无缝滚动
          swiperIntervalFn1();
        } else {
          const height = swiperOut.getBoundingClientRect().height;
          // 设置计时器
          state.swiperInterval = setInterval(() => {
            if (state.currentPageIndex < allPage - 1) {
              state.currentPageIndex += 1;
              swiperInner.style.setProperty('transform', `translateY(-${height * state.currentPageIndex}px)`);
              if (state.currentPageIndex === allPage - 1) {
                clearInterval(state.swiperInterval);
                setTimeout(() => {
                  // 关闭动画
                  swiperInner.style.transitionDuration = '0ms';
                  // 重置top
                  swiperInner.style.setProperty('transform', 'translateY(0px)');
                  const data = JSON.parse(JSON.stringify(state.allNewsList));
                  for (let i = 0; i < props.maxLength; i++) {
                    data.push(state.allNewsList[i]);
                  }
                  state.quickNewsList = data;
                  state.currentPageIndex = 0;
                  setTimeout(() => {
                    swiperTrans();
                  }, 1000);
                }, 1000);
              }
            }
          }, props.delay);
        }
      }
    };
    // 无缝滚动
    const swiperIntervalFn1 = () => {
      const swiperInner = document.getElementsByClassName('swiperInner')[0];
      const swiperItem = document.getElementsByClassName('swiperItem')[0];
      const height = swiperItem.getBoundingClientRect().height;
      if (swiperInner && swiperItem) {
        state.swiperInterval = setTimeout(() => {
          console.log('定时任务');
          count += 1;
          swiperInner.style.setProperty('transform', `translateY(-${height * count}px)`);
          if (count === props.dataList.length) {
            // console.log('一轮结束')
            clearTimeout(state.swiperInterval);
            setTimeout(() => {
              // 关闭动画
              swiperInner.style.transitionDuration = '0ms';
              // 重置top
              swiperInner.style.setProperty('transform', 'translateY(0px)');
              const data = JSON.parse(JSON.stringify(state.allNewsList));
              for (let i = 0; i < props.maxLength; i++) {
                data.push(state.allNewsList[i]);
              }
              state.quickNewsList = data;
              state.currentPageIndex = 0;
              setTimeout(() => {
                swiperTrans();
              });
            }, 1000);
          }
          swiperIntervalFn1();
        }, 1000);
      }
    };
    const sizeReload = () => {
      // 横向size重置
      const acrossList = document.getElementsByClassName('acrossClass');
      for (let i = 0; i < acrossList.length; i++) {
        const item = acrossList[i];
        // 获取高度
        const styles = window.getComputedStyle(item.getElementsByClassName('nut-noticebar__page-wrap-content')[0]);
        // 设置高度
        item.getElementsByClassName('nut-noticebar__page-wrap')[0].style.height = styles.height;
      }
      clearInterval(state.swiperInterval);
      setTimeout(() => {
        const swiperInner = document.getElementsByClassName('swiperInner')[0];
        if (swiperInner) {
          swiperInner.style.setProperty('transform', `translateY(-0px)`);
          swiperInner.style.transitionDuration = '0ms';
          state.currentPageIndex = 0;
          swiperTrans();
        }
      });
    };
    onShow(() => {
      if (state.swiperInterval) {
        clearInterval(state.swiperInterval);
      }
      sizeReload();
    });
    onBeforeUnmount(() => {
      console.log('组件销毁之前');
      // 执行清理操作或取消订阅等
      clearInterval(state.swiperInterval);
    });
    watch(
      () => store.useResizeStore().resize,
      () => {
        // 视口大小发生变化时的处理逻辑
        // 可以在这里执行相应的操作
        console.log('noticebar resize监听');
        sizeReload();
      },
      { deep: true },
    );
    watch(
      () => props.dataList,
      () => {
        state.text = '';
        state.list = [];
        state.direction = props.direction;
        if (typeof props.dataList === 'string') {
          state.text = props.dataList;
        } else {
          state.list = props.dataList;
        }
        if (props.direction === 'swiper') {
          const dataList = JSON.parse(JSON.stringify(props.dataList));
          if (dataList.length % props.maxLength === 0 || dataList.length <= props.maxLength) {
            state.quickNewsList = dataList;
            state.allNewsList = dataList;
          } else {
            if (props.swiperDirection === 'seamless') {
              const count = props.maxLength - (dataList.length % props.maxLength);
              for (let i = 0; i < count + 1; i++) {
                dataList.push(dataList[i]);
              }
            } else {
              const count = props.maxLength - (dataList.length % props.maxLength);
              for (let i = 0; i < count; i++) {
                dataList.push({ title: '', time: '' });
              }
            }
            state.quickNewsList = dataList;
            state.allNewsList = dataList;
          }
          if (state.direction === 'swiper' && state.quickNewsList.length > 0) {
            state.quickNewsList = JSON.parse(JSON.stringify(state.allNewsList));
            if (state.quickNewsList.length > props.maxLength) {
              for (let i = 0; i < props.maxLength; i++) {
                state.quickNewsList.push(state.quickNewsList[i]);
              }
            }

            nextTick(() => {
              swiperTrans();
            });
          }
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );
    return {
      ...toRefs(state),
      noticeBarClick,
      close,
      acrossEnd,
    };
  },
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: auto;

  .acrossBox {
    height: 64upx;
    overflow: hidden;

    :deep(.nut-noticebar) {
      .nut-noticebar__page {
        padding: 0 32upx;
        height: 64upx;

        .nut-noticebar__page-wrap-content {
          height: 40upx;
          font-size: 28upx;
          font-weight: 400;
          color: #ff9c00;
          line-height: 44upx;
        }
      }
    }
  }

  .hideLeftIcon {
    :deep(.nut-noticebar__page-lefticon) {
      display: none;
    }
  }

  .verticalBox {
    position: relative;
    height: 60upx;

    :deep(.nut-noticebar) {
      .nut-noticebar__vertical {
        height: 60upx !important;
        padding: 0 24upx 0 68upx;
      }

      .nut-noticebar__vertical-list {
        height: 60upx !important;

        .nut-noticebar__vertical-item {
          height: 60upx !important;
          line-height: 60upx !important;
        }
      }
    }

    .verticalLeftIconClass {
      position: absolute;
      top: 50%;
      left: 24upx;
      transform: translate(-0%, -50%);
    }
  }
}

.contentUl {
  max-height: 88upx;
  height: 88upx;
  width: calc(100vw - 150upx);
  padding-left: 24upx;
  overflow: hidden;

  .nut-swiper {
    :deep(.nut-swiper-inner) {
      width: 100% !important;
    }
  }

  .swiperClass {
    height: 36upx;

    .swiperItem {
      height: 36upx !important;
    }

    //.contentLi {
    //  //height: 44upx;
    //  display: flex;
    //  justify-content: space-between;
    //  font-size: 24upx;
    //  font-weight: 400;
    //  padding: 4upx 0;
    //
    //  .title {
    //    font-size: 12upx;
    //    color: $title-color;
    //  }
    //
    //  .date {
    //    font-size: 12upx;
    //    color: $text-color;
    //    padding-left: 24upx;
    //  }
    //}
    //.contentLi:last-child {
    //  padding-bottom: 0;
    //}

    .animation {
      animation: myMove 5s ease-in infinite; // infinite
    }
  }
}

.swiperOut {
  width: calc(100vw - 136upx); //64 24
  height: 36upx;
  position: relative;
  overflow: hidden;

  .swiperInner {
    position: absolute;
    width: 100%;
    height: 36upx;
    left: 0;
    top: 0;

    //transition-duration: 1000ms;
    .swiperItem {
      width: 100%;
      height: 36upx;
      display: flex;
      justify-content: space-between;
      font-size: 24upx;
      font-weight: 400;

      .swiperTitle {
        //color: $title-color;
        flex: 1;
        //width: 519upx;
        height: 36upx;
        font-size: 24upx;
        font-weight: 400;
        color: #242e43;
        line-height: 36upx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .swiperTime {
        //color: $text-color;
        width: 70upx;
        height: 36upx;
        font-size: 24upx;
        font-weight: 400;
        color: #7b8299;
        line-height: 36upx;
      }
    }
  }
}

:deep(.acrossClass) {
  .nut-noticebar__page {
    padding: 0 32upx !important;
  }

  .nut-noticebar__page-wrap-content {
    font-size: 28upx !important;
    font-weight: 400;
    line-height: 44upx;
  }
}

:deep(.verticalClass) {
  .nut-noticebar__vertical {
    //padding-top: 20px !important;
    //padding-bottom: 20px !important;
  }

  .nut-noticebar__vertical-item {
    font-size: 24upx;
    font-weight: 400;
    line-height: 44upx;
    height: auto !important;
  }
}

:deep(.swiperClass) {
  .nut-noticebar__page-lefticon {
    margin: 0;
    margin-right: 24upx;
  }

  .nut-noticebar__page {
    padding: 24upx 0 0;
  }
}

.tc {
  font-size: 24upx;
  color: $text-color;
}
</style>
