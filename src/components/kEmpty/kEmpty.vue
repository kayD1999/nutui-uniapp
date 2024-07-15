<!--
 * @Description: k-empty
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-03-04 16:02
 * @FilePath: /src/components/kEmpty/kEmpty.vue
-->
<template>
  <div class="empty">
    <!-- 默认样式 -->
    <div class="empty_content empty tc w-full h-full">
      <img class="emptyImg" :src="`/static/emptyImages/${imageName}.png`" alt="" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'KEmpty',
  props: {
    /**
     * @description: images\empty 图片名称
     * @param
     * @author: zou hua
     */
    imageName: {
      type: String,
      default: 'emptyList',
    },
    /**
     * @description: 宽度
     * @param
     * @author:
     */
    width: {
      type: String,
      default: '180upx',
    },
    /**
     * @description: 高度
     * @param
     * @author:
     */
    height: {
      type: String,
      default: '210upx',
    },
  },
  setup() {
    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.empty {
  height: inherit;
  min-height: 210upx;
  width: 100%;
  position: relative;

  .empty_content {
    padding: 20px 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;

    .emptyImg {
      width: 180upx;
      height: 210upx;
    }
  }
}
</style>
