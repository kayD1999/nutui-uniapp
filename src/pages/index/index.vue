<template>
  <k-base-layout>
    <template #fixHeader>
      <!--头部搜索-->
      <!--展示条件：组件配置，全量展示，角色配置-->
      <template v-if="hideType == 'module' || hideType == 'all' || hideType == 'roleUpdate'">
        <k-header-search v-if="sysComFilter('headerSearch')"></k-header-search>
      </template>
      <!--菜单-->
      <!--展示条件：菜单配置，全量展示，角色配置-->
      <template v-if="hideType == 'menu' || hideType == 'all' || hideType == 'roleUpdate'">
        <k-top-tabbar :menu-list="menuList"></k-top-tabbar>
      </template>
    </template>
    <template #default>
      <!--组件-->
      <!--展示条件：组件配置，全量展示，角色配置-->
      <template v-if="hideType == 'module' || hideType == 'all' || hideType == 'roleUpdate'">
        <!-- #ifdef H5 -->
        <template v-if="assemblyList && assemblyList.length > 0">
          <view v-for="(item, index) in assemblyList" :key="item.assemblyIdentifying + '_' + index">
            <template v-if="!specialRoleComponents.includes(item.assemblyIdentifying)">
              <!-- 动态组件 -->
              <component :is="isNaN(item.assemblyIdentifying) ? item.assemblyIdentifying : ''" />
            </template>
          </view>
        </template>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <template v-if="assemblyComputed('combinationOverview')">
          <combination-overview></combination-overview>
        </template>
        <template v-if="assemblyComputed('macroMarket')">
          <macro-market></macro-market>
        </template>
        <template v-if="assemblyComputed('keyStockAnalysis')">
          <key-stock-analysis></key-stock-analysis>
        </template>
        <!-- #endif -->
      </template>
    </template>
  </k-base-layout>
</template>

<script lang="ts">
import { onPageScroll } from '@dcloudio/uni-app';
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';

import { menuAndAssemblyAssemblyList, menuAndAssemblyMenuList, mobileRolePossessed } from '@/apis/modules/system';
import { currentRoute } from '@/utils/basic';

import combinationOverview from './combinationOverview.vue';
import keyStockAnalysis from './keyStockAnalysis.vue';
import macroMarket from './macroMarket.vue';

export default defineComponent({
  name: 'Index',
  components: {
    combinationOverview,
    macroMarket,
    keyStockAnalysis,
  },
  setup() {
    const route = getCurrentPages();
    const state = reactive({
      menuList: [],
      assemblyList: [],
      hideType: '',
      title: 'title',
      specialRoleComponents: ['messageReminder', 'roadshowInformation'],
    });

    // 内网/外网/白名单  菜单/组件获取
    const getMobileRolePossessed = (query) => {
      // whiteFlag为后端存储的，直接从local/session里面取值
      // query.whiteFlag = sessionStorage.getItem('whiteFlag');
      query.whiteFlag = 1;
      mobileRolePossessed(query).then(({ data }) => {
        state.menuList = data.menuList;
        state.assemblyList = data.assemblyList;
      });
    };

    //  获取菜单列表
    const getMenuAndAssemblyMenuList = () => {
      menuAndAssemblyMenuList()
        .then(({ data }) => {
          console.log('menu');
          console.log(data);
          state.menuList = data.filter((item) => item.state === '1');
        })
        .catch(() => {});
    };

    const getMenuAndAssemblyAssemblyList = () => {
      menuAndAssemblyAssemblyList()
        .then(({ data }) => {
          console.log('组件');
          console.log(data);
          // state.roleComponentsLoading = false;
          // init(state.thatDate);
          state.assemblyList = data.filter((item) => item.state === '1');
          console.log(state.assemblyList);
        })
        .catch(() => {});
    };

    // 系统组件过滤
    const sysComFilter = (assemblyName) => {
      const filterData = state.assemblyList.filter((item) => {
        return item.assemblyIdentifying === assemblyName;
      });
      return filterData.length > 0;
    };

    const assemblyComputed = computed(() => {
      return (name) => {
        return state.assemblyList.some((item) => item.assemblyIdentifying === name);
      };
    });

    watch(
      () => route,
      () => {
        // 参数发生变化时触发的回调函数
        /**
         * hideType
         * menu 菜单全量
         * module 组件全量
         * roleUpdate 内网/外网/白名单
         */
        setTimeout(() => {
          const currentPage = getCurrentPages()[getCurrentPages().length - 1];

          const routeInfo = currentRoute(currentPage);

          if (routeInfo.path === '/' || routeInfo.path === '/pages/index/index') {
            console.log(routeInfo.query.hideType);
            if (routeInfo.query.hideType) {
              // 存在hideType
              state.hideType = routeInfo.query.hideType;

              if (state.hideType === 'menu') {
                getMenuAndAssemblyMenuList();
              } else if (state.hideType === 'module') {
                getMenuAndAssemblyAssemblyList();
              } else if (state.hideType === 'roleUpdate') {
                const query = {
                  roleCode: routeInfo.query.roleCode,
                  network: routeInfo.query.network,
                };
                getMobileRolePossessed(query);
              } else if (state.hideType === 'preview') {
                state.hideType = 'all';
                getMobileRolePossessed({});
              }
            } else {
              // 全量展示
              state.hideType = 'all';
              getMobileRolePossessed({});
            }
          }
        });
      },
      { deep: true, immediate: true },
    );

    onPageScroll(() => {});
    return {
      ...toRefs(state),
      assemblyComputed,
      sysComFilter,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
