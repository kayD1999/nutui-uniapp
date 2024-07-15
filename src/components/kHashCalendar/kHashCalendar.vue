<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-11 10:10
 * @FilePath: /src/components/kHashCalendar/kHashCalendar.vue
-->
<template>
  <view class="hash_calendar">
    <k-card no-header>
      <template v-if="isShowCalendar">
        <!-- 组件文档 https://calendar.hxkj.vip/#/api#props -->
        <!-- default-datetime   指定默认时间，type 为 multiple 或 range 时为数组，传入 null 表示默认不选择 -->
        <!-- change-year-fast   是否支持点击操作栏（标题栏）的日期区域快速切换年份 -->
        <!-- show-arrow   是否显示周月切换时的指示箭头（日历下方的小箭头），当 model 等于 inline 时生效 -->
        <!-- show-action   是否显示日历组件操作栏（标题栏） -->
        <!-- scroll-change-date   控制滑动的时候是否修改选中的日期 -->

        <vue-hash-calendar
          ref="calendar"
          picker-type="date"
          v-bind="$attrs"
          format="YY-MM-DD"
          model="inline"
          :change-year-fast="false"
          :show-arrow="true"
          :show-week-view="true"
          :scroll-change-date="false"
          @slidechange="slidechangeFn"
          @change="changeFn"
          @click="clickFn"
          @touchend="touchendFn"
        >
          <!-- <template #action="scope">
            <div class="">
              {{ scope?.date }}
            </div>
          </template> -->
          <template #today>
            <span class="tadayBn" @click="todayFn">今</span>
          </template>
          <template #day="scope">
            <div v-if="scope?.extendAttr?.isToday">今</div>
            <div v-else>
              {{ scope?.date?.day }}
            </div>
          </template>
        </vue-hash-calendar>
        <div v-if="isAnCalendar" class="that_month">
          {{ thatMonth }}
        </div>
        <!-- mark-date 需要被标记的日期
          week-start 以星期几作为日历每一周的起始星期
          change-year-fast 是否支持点击操作栏（标题栏）的日期区域快速切换年份
          checked-day-class-name="checked-day-class-name"  日期被选中的claseName
        today-class-name="today-class-name" 当天日期的 className -->
      </template>

      <!-- 日历初始化占位 -->
      <div v-else class="calendar_seize" />
    </k-card>
  </view>
</template>

<script>
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue';

import store from '@/store';
import { getTnDate } from '@/utils/dateFormat';

export default defineComponent({
  name: 'KHashCalendar',
  emits: ['slidechangeFn', 'touchendFn', 'clickFn', 'changeFn'],
  setup(props, content) {
    const calendar = ref(null);
    const state = reactive({
      // 是否显示日历   ipad 竖屏横屏切换显示异常
      isShowCalendar: true,
      // 是否展开日历
      isAnCalendar: false,
      thatMonth: '', // 获取当前页月份
      date: getTnDate(), // 展示用yyy-mm-dd
    });
    // 设置月份
    const setMonthTest = () => {
      // console.log('设置月份');
      nextTick(() => {
        // 获取日期
        const textContent = calendar.value?.$el?.querySelector('.calendar_title_date_active')?.textContent || '';
        if (textContent) {
          // 获取月份
          state.thatMonth = textContent.slice(5, 7); // 使用substr()方法，从第5个字符开始提取2个字符
        }
      });
    };
    /**
     * 日历滑动的方向。返回值：right、left、up、down 。
     * */
    const slidechangeFn = (val) => {
      // console.log('日历滑动的方向。返回值：right、left、up、down 。', val);
      if (val === 'down') {
        state.isAnCalendar = true;
      } else if (val === 'up') {
        state.isAnCalendar = false;
      }
      content.emit('slidechangeFn', val);
    };
    /**
     * 日历滑动 end 事件，同于原生该事件。
     * */
    const touchendFn = (val) => {
      setTimeout(() => {
        // 设置月份
        setMonthTest();
        const textContent = calendar.value?.$el?.querySelector('.calendar_title_date_active')?.textContent || '';
        content.emit('touchendFn', val, textContent);
      });
    };
    /**
     * 点击改变
     * */
    const clickFn = (val) => {
      content.emit('clickFn', val);
    };
    /**
     * 返回今天
     * */
    const todayFn = () => {
      clickFn(getTnDate());
    };
    /**
     * 日期改变时，触发该事件。（返回的日期格式取决于 format 属性）
     * */
    const changeFn = (val) => {
      content.emit('changeFn', val);
      // 设置月份
      setMonthTest();
    };
    /**
     * 禁用今天以后的日期
     * */
    const disabledDate = (date) => {
      const timestamp = date.getTime();
      return timestamp > new Date().getTime();
    };
    onMounted(() => {
      state.isShowCalendar = true;
    });
    // 监听窗口大小
    watch(
      () => store.useResizeStore().resize,
      () => {
        state.isShowCalendar = false;
        nextTick(() => {
          state.isShowCalendar = true;
        });
      },
      { deep: true },
    );
    return {
      ...toRefs(state),
      disabledDate,
      calendar,
      slidechangeFn,
      changeFn,
      clickFn,
      touchendFn,
      todayFn,
    };
  },
});
</script>

<style scoped lang="scss">
.hash_calendar {
  width: 100%;
  height: auto;
  position: relative;
  left: 0;
  top: 0;

  // 占位
  .calendar_seize {
    width: 100%;
    height: 228upx;
  }

  :deep(.calendar_content) {
    background: transparent;

    .calendar_body {
      max-width: 750px;
      margin: 0 auto;
      font-size: 24upx;

      .calendar_day {
        font-size: 24upx;
        font-weight: 400;
        color: #242e43;
        height: 60upx;
        margin: 10upx 0;
      }

      .calendar_group {
        top: 2.2rem;
      }
    }

    .calendar_group_li {
      background: transparent;
    }

    .calendar_item_disable {
      background: rgb(219 219 219 / 30%);
    }
  }

  :deep(.calendar_title) {
    background: #fff;

    .calendar_title_date {
      padding: 16upx;
      display: inherit;

      .calendar_title_date_year {
        font-size: 28upx;
        font-weight: 600;
        color: #242e43;
        line-height: 44upx;
      }
    }

    .calendar_confirm {
      margin-right: 0;
      display: flex;

      .tadayBn {
        background: #e3f0ff;
        border-radius: 8upx;
        font-size: 24upx;
        font-weight: 400;
        color: #0c6bd8;
        padding: 6upx 12upx;
      }
    }
  }

  .that_month {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 180upx;
    font-weight: 500;
    color: #e3f0ff;
    line-height: 160upx;
  }

  :deep(.hash-calendar) {
    .calendar_day {
      height: 60upx;
      width: 60upx;
    }

    .ctrl-img {
      height: 40upx;
      display: flex;
      padding: 0;
      margin: 0;
      align-items: center;
      justify-content: center;
    }

    .calendar_mark_circle {
      border: none;
      color: #0c6bd8 !important;
      // box-shadow: 0px 0px 1px 2px #E3F0FF;
      background: #e3f0ff;
      border-radius: 8upx;
    }

    .calendar_day_checked,
    .calendar_day_today.calendar_day_checked {
      border-radius: 8upx;
      background: #0c6bd8 !important;
      color: $white !important;
    }

    .calendar_day_today {
      background: inherit;
      color: #0c6bd8 !important;
    }

    .calendar_first_today {
      color: #4c4c4c;
    }
  }
}
</style>
