<!--
 * @Description: 遮罩组件
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-26 15:22
 * @FilePath: /src/components/kMaskCover.vue
-->
<template>
  <view class="coverArea" :style="visibleComputed('style')">
    <view class="cover"></view>
    <view class="info">{{ visibleComputed('desc') }}</view>
  </view>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue';

import { useMaskCoverStore } from '@/store/modules/maskCover';

export default defineComponent({
  name: 'KMaskCover',
  props: {
    coverCode: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const state = reactive({});

    const visibleComputed = computed(() => {
      return (value) => {
        const coverList = useMaskCoverStore().coverList;

        if (!props.coverCode) return '';

        if (coverList.length <= 0) return '';

        const filterData = coverList.filter((item) => {
          return item.coverCode === props.coverCode;
        });

        if (filterData.length > 0) {
          if (value === 'style') {
            return 'display: block';
          }
          if (value === 'desc') {
            return filterData[0].describe;
          }
        }

        return '';
      };
    });

    return {
      ...toRefs(state),
      visibleComputed,
    };
  },
});
</script>

<style scoped lang="scss">
.coverArea {
  display: none;
  position: absolute;
  inset: 0;
  z-index: 30;

  .cover {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 50;
    backdrop-filter: blur(10px);
    filter: blur(10px);
  }

  .info {
    position: absolute;
    z-index: 100;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 80%;
    box-shadow:
      0 0.0625rem 0.25rem -0.1875rem rgb(0 0 0 / 2%),
      0 0.125rem 0.375rem 0 rgb(0 0 0 / 3%),
      0 0.1875rem 0.5rem 0.0875rem rgb(0 0 0 / 4%);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #242e43;
    padding: 0.75rem 1rem;
    background: #fff;
  }
}
</style>
