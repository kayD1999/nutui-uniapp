<!--
 * @Description: 个人中心
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-07 09:35
 * @FilePath: /src/pages/user/index.vue
-->
<template>
  <k-base-layout class="bg-white index">
    <user-info></user-info>
    <user-service></user-service>
  </k-base-layout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

import userInfo from './user-info.vue';
import userService from './user-service.vue';

export default defineComponent({
  name: 'Index',
  components: {
    userInfo,
    userService,
  },
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss"></style>
