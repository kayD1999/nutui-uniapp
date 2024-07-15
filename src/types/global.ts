import type dayjs from 'dayjs';

declare module 'vue' {
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs;
    // 在此处添加其他全局属性或方法的类型定义
  }

  interface GlobalComponents {
    // 在此处定义全局组件
  }

  interface GlobalProperties {
    // 在此处定义全局属性或方法
  }
}
