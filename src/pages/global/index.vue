<template>
  <k-base-layout class="bg-white index">
    <dayjs></dayjs>
  </k-base-layout>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';

import dayjs from '@/pages/global/dayjs.vue';

export default defineComponent({
  name: 'Index',
  components: {
    dayjs,
  },
  setup() {
    const route = useRoute();
    const state = reactive({});
    onMounted(() => {
      // console.log(route.query);
    });
    return {
      ...toRefs(state),
      route,
    };
  },
});
</script>

<style scoped lang="scss"></style>
