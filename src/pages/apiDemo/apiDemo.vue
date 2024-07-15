<!--
 * @Description: api使用示例
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-02-06 13:49
 * @FilePath: /src/pages/apiDemo/apiDemo.vue
-->
<template>
  <view>
    <h1>api调用示例</h1>
    <button @click="getQuery">get请求</button>
    <button @click="postQuery">post请求</button>
  </view>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'ApiDemo',
  setup() {
    const { proxy } = getCurrentInstance();
    const state = reactive({});

    const getQuery = () => {
      const query = {
        username: 'admin',
        password: '123456',
      };
      proxy.$Api
        .getDemo(query)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          return err;
        });
    };
    const postQuery = () => {
      const query = {
        argument1: 1,
        argument2: 2,
      };
      proxy.$Api
        .postDemo(query)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          return err;
        });
    };
    return {
      ...toRefs(state),
      getQuery,
      postQuery,
    };
  },
});
</script>

<style scoped lang="scss"></style>
