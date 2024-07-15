<!--
 * @Description: store仓库使用demo
 * @Version: 1.0
 
 * @FilePath: /src/pages/store/store.vue
-->
<template>
  <view>
    <h1>store demo</h1>
    {{ count }}
    <button @click="countPlus">actionsClick</button>
  </view>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';

import store from '@/store/index';

export default defineComponent({
  name: 'Store',
  setup() {
    const state = reactive({
      demoCount: store.useDemoStore().count,
    });

    const count = computed(() => {
      return store.useDemoStore().count;
    });

    const countPlus = () => {
      store.useDemoStore().countPlus();
    };
    onMounted(() => {});
    return {
      ...toRefs(state),
      count,
      countPlus,
    };
  },
});
</script>

<style scoped lang="scss"></style>
