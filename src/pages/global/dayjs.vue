<template>
  <nut-table :columns="columns" :data="data"></nut-table>

  <div class="ww">Day.js 本身并不支持节假日的判断，不过可以通过三方插件或类库实现，下面列举安装chinese-workday示例</div>
  <nut-table :columns="columns" :data="datas"></nut-table>
</template>

<script setup>
import { getFestival, isAddtionalWorkday, isHoliday, isWorkday } from 'chinese-workday';
import dayjs from 'dayjs';
import { ref } from 'vue';

const columns = ref([
  {
    title: '需求',
    key: 'name',
  },
  {
    title: '操作方法',
    key: 'method',
  },
  {
    title: '值',
    key: 'value',
  },
]);
const day = dayjs();
const data = ref([
  {
    name: '当前时间原始格式',
    method: 'dayjs()',
    value: day,
  },
  {
    name: '当前时间转时间戳',
    method: 'dayjs().valueOf()',
    value: day.valueOf(),
  },
  {
    name: '当前时间转ISO8601 格式',
    method: 'dayjs().format()',
    value: day.format(),
  },
  {
    name: '近3年',
    method: "dayjs().subtract(5, 'year')",
    value: day.subtract(3, 'year').format(),
  },
  {
    name: '近一个月',
    method: "dayjs().subtract(1, 'month')",
    value: day.subtract(1, 'month').format(),
  },
  {
    name: '昨天',
    method: "dayjs().subtract(1, 'day')",
    value: day.subtract(1, 'day').format(),
  },
  {
    name: '今天',
    method: 'dayjs()',
    value: day.format(),
  },
  {
    name: '明天',
    method: "dayjs().add(1, 'day')",
    value: day.add(1, 'day').format(),
  },
  {
    name: '是否是周末',
    method: '[1, 7].includes(day.day())',
    value: [1, 7].includes(day.day()),
  },
  {
    name: '当天周几',
    method: ' dayjs().day()',
    value: day.day(),
  },
  {
    name: '一年内区间',
    method: "dayjs().startOf('year') - dayjs().endOf('year')",
    value: `${day.startOf('year').format()} - ${day.endOf('year').format()}`,
  },
  {
    name: '距离2024-03-01多少分钟',
    method: "dayjs().diff(dayjs('2024-03-01'), 'minute')",
    value: day.diff(dayjs('2024-03-01'), 'minute'),
  },
  {
    name: '距离2024-03-01多少小时',
    method: "dayjs().diff(dayjs('2024-03-01'), 'hour')",
    value: day.diff(dayjs('2024-03-01'), 'hour'),
  },
  {
    name: '距离2024-03-01多少天',
    method: "dayjs().diff(dayjs('2024-03-01'), 'day')",
    value: day.diff(dayjs('2024-03-01'), 'day'),
  },
  {
    name: '往前一个月',
    method: "dayjs().subtract(1, 'month')",
    value: day.subtract(1, 'month').format(),
  },
  {
    name: '往前一个年',
    method: "dayjs().subtract(1, 'year')",
    value: day.subtract(1, 'year').format(),
  },
  {
    name: 'T-1往前3个年',
    method: "dayjs().subtract(3, 'year')",
    value: day.subtract(3, 'year').format(),
  },
]);

const datas = ref([
  {
    name: '是否工作日',
    method: "isWorkday('2024-02-10')",
    value: isWorkday('2024-02-10'),
  },
  {
    name: '是否调休',
    method: "isAddtionalWorkday('2024-02-18')",
    value: isAddtionalWorkday('2024-02-18'),
  },
  {
    name: '是否节假日',
    method: "isHoliday('2024-02-10')",
    value: isHoliday('2024-02-10'),
  },
  {
    name: '节假日名称',
    method: "getFestival('2024-02-10')",
    value: getFestival('2024-02-10'),
  },
]);
</script>

<style scoped lang="scss">
.ww {
  margin: 1rem;
  font-size: 18px;
  font-weight: 500;
}
</style>
