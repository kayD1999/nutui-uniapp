<!--
 * @Description: xxx
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-10 15:53
 * @FilePath: /src/components/kTopTabbar/kTopTabbar.vue
-->
<template>
  <view :class="['tabbar', menuClass]">
    <view v-for="(item, index) in menuNum" :key="index" class="tabbar-item" @click="menuClick(index)">
      <template v-if="isMoreMenu && index === 11">
        <image
          class="image"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAABSxJREFUeF7tnT1oU1EUx++tCrVpm4K4Ka4ZHMzkILSxkaJFpUOHoAjFSdHNQd2yqYObopMUHIzQofiFFFNTwdU6OHRV3ERo+qGltr2SmtCH7cu7973zmvNO/l1zct45/989576k951ohT/RCmjR2SE5BcDCFwEAA7BwBYSnhwoG4C0FTpy/3PN7+dew0SpnjDqkjepphT5Gq0Wt1XdtVGV/quvNxxdPFuOIQ0K+VhWcKxb3Vj/M3VDa3DZGpeMQM6xPrVVVGX0n3Z+5XykW18L68b5PUr6BgHMjY33VhZUJo0yeQry4fGily+neztHK5Ph8lGtIy7cp4PpKfssdbgPoJuT+zOmwlSwx36aAs4OFm0aZu1EqYrffq5W+NTtduhfmuhLz9QV8/MzF3tXVtW/c9twgcLU9uSuVOux64yU1X1/A2fyFgjHrz4IE5fh6h9aFT+XSc5fYpObrD/hU4ZHZMFf8RNJa/1RGfXERkcxWq6PGmAO+sXXox7PvSlddrpcVmq8v4GP5wktlzNmdRKrBPbhn35GpqafLLiJS2Q4NXUr9WP/z1Rey1q8+l0vnXK4nNV//Ch4sVIwyAzsCVnpmdrqUcxGQ2jZLHB+1Py75AnCdBAB7lqRGBVMXaKC/sAsQFYwK3r64UMGBBUdugAqOuIWEFZCcpI/DsPGhRaNFo0UneUtCBaOCUcGo4N260/BcJ+xNh1+o1P6oJQkbH1o0WjRaNFo0dT+y8Be2ZaFFC29ZAAzA29YAWrRFS6U2QYveUrTZAsRdtPCOBcAAjI9J2IOpN1gLf9iDsQc7HQqkXjAWa9TJJGx82IOxB2MPxh7s1GxojMO2LHyTJbxlATAA46vKJO9JqGBUMCoYFUxzo+jiJexNJR4fravcfo+PCn0g2ncPFpovRjg07jmEjqzAEJY64LYbwlLLW+JYoWY3NhLzxSA0D/G2G4RWy13aaL+gjybS8g2cVbkJGcNIg9bFrr3uOnzVCnAj+n83ImZY6Y0BDuOElemY6Up1vnadamdLQ0K+ToBthYEdHwUAmA+LWCIB4Fhk5eMUgPmwiCUSAI5FVj5OAZgPi1giAeBYZOXjFID5sIglEgCORVY+TgGYD4tYIgHgWGTl4xSA+bCIJRInwBJ+y89Wxe7rc+9tbVtht/Qgc9LmulaA2+3fhTXhuq/NGRsBW2Wz9DBjxS7QSNo/wG2BtAVgiUdYANijgMRDaABcV0DqMVIArisg9bf8ALgBWOijHNaApX9Mkvowli1gKXaYsiOFpE8eAAzA2xWQ+AC4VM6oYKlk63kBMACjRSd5DaCCk0zPInYAthApySYAnGR6FrEDsIVISTYB4CTTs4gdgC1EojChPuMV+UxW2NF5FGLY+OAe3/85UB8Binwmi7uA3OMDYJsybWIDwBFPVXIXkHt8qGBUcCQFsAdPl5x+NymS2hZvxk2WhUhek8S1aOIzXviYxKyCHdcvmTm+6CCTkqcjAObJhSwqACaTkqcjAObJhSwqACaTkqcjAObJhSwqACaTkqcjAObJhSwqACaTkqcjAObJhSwqX8B4fJRM45Y68q9gPAAue04WRjgIn5OFISzCAdc2DoxRaun22fTikU901LxjEJpwwJuQR8b6qgsrE0aZPN90ldJKl9O9naOVyfF5ijipj9hQxOT1QVLBDYcYRkqNJ7o/UsCNcCT8lp+ttNSPmthe19Yu8pks2wvBjrcCgeOEeYeP6IIUAOAghRL+OgAnHGBQ+AAcpFDCXwfghAMMCv8viMjs4j17HJYAAAAASUVORK5CYII="
        ></image>
        <view class="text">更多</view>
      </template>
      <template v-else>
        <image class="image" :src="menuList[index].icon"></image>
        <view class="text">{{ nameComputed(menuList?.[index]?.menuName) }}</view>
        <span v-if="showCornerMark(menuList?.[index])" class="flag_ico"
          ><image mode="heightFix" class="icon" :src="menuList?.[index]?.cornerMark" alt=""
        /></span>
      </template>
    </view>
  </view>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';

import { navigateTo } from '@/utils/basic';

export default defineComponent({
  name: 'KTopTabbar',
  props: {
    /**
     * @description:  菜单列表
     */
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({
      activeName: '',
      menuClass: '',
      // 是否显示跳转更多按钮
      isMoreMenu: false,
    });
    watch(
      () => props.menuList,
      () => {
        const menuList = props.menuList;
        let menuNum = 0;
        let menuClass = 'menu_0';
        if (menuList.length > 10) {
          menuNum = 12;
          menuClass = 'menu_12';
        } else if (menuList.length > 8) {
          menuNum = 10;
          menuClass = 'menu_10';
        } else if (menuList.length > 6) {
          menuNum = 8;
          menuClass = 'menu_8';
        } else if (menuList.length > 1) {
          menuNum = menuList.length;
          menuClass = `menu_${menuList.length}`;
        } else {
          menuNum = menuList.length;
          menuClass = `menu_${menuList.length}`;
        }

        state.isMoreMenu = menuList.length > 12;
        state.menuClass = menuClass;
        state.menuNum = menuNum;
        state.menuList = menuList;
      },
      { immediate: true, deep: true },
    );
    function tabSwitch(item, index) {
      const linkUrl = state.menuList?.[index]?.route;
      if (item.name === '&更多菜单&') {
        uni.navigateTo({ url: `/pages/basis/moreMenu?${getUrlParams(route.query)}` });
        // router.push(`/pages/basis/moreMenu?${getUrlParams(route.query)}`);
      } else if (props.menuList[index].menuIdentifying === 'scoring') {
        store.useScoringStore().removeMarkList();
        store.useScoringStore().removeRawMarkList();
        store.useScoringStore().removeColums();
        store.useScoringStore().removeListRule();
        store.useScoringStore().removeDeptMarkInfo();
        uni.navigateTo({ url: linkUrl });
        // router.push(linkUrl);
      } else if (linkUrl) {
        uni.navigateTo({ url: linkUrl });
        // router.push(linkUrl);
      }
    }
    // 菜单名称过滤
    const nameComputed = computed(() => {
      return (value) => {
        if (!value) return null;
        return value.replace(/\${(.*?)}/g, '');
      };
    });
    /**
     * @description: 是否显示菜单角标
     * @param {*} computed
     * @return {*}
     */
    const showCornerMark = computed(() => {
      return (row) => {
        if (row.cornerMark) {
          const thatDate = new Date().getTime();
          const endDate = row.cornerEndDate || null;

          // console.log('thatDate',thatDate);
          // console.log('endDate',endDate);
          return endDate ? endDate > thatDate : true;
        }
        return false;
      };
    });
    const menuClick = (index) => {
      if (index === 11 && state.isMoreMenu) {
        console.log('跳转至更多菜单');
        navigateTo('/pages/moreMenu/index');
      } else {
        navigateTo(state.menuList[index].route);
      }
    };
    return {
      ...toRefs(state),
      tabSwitch,
      nameComputed,
      showCornerMark,
      menuClick,
      navigateTo,
    };
  },
});
</script>

<style scoped lang="scss">
.tabbar {
  background: #fff;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 12upx;
  padding-bottom: 22upx;

  .tabbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 28upx;
    position: relative;

    .image {
      width: 60upx;
      height: 60upx;
    }

    .text {
      font-size: 24upx;
      color: #4b5666;
      margin-top: 14upx;
      line-height: 36upx;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .flag_ico {
      position: absolute;
      right: 0;
      top: -16upx;
      height: 32upx;

      .icon {
        height: 100%;
      }
    }
  }
}

.menu_12 {
  justify-content: start;

  .tabbar-item {
    width: 16.6%;
  }
}

.menu_10 {
  justify-content: start;

  .tabbar-item {
    width: 20%;
  }
}

.menu_8 {
  justify-content: start;

  .tabbar-item {
    width: 25%;
  }
}

.menu_6 {
  display: flex;
  justify-content: space-around;

  .tabbar-item {
    flex: 1;
  }
}

.menu_1 {
  justify-content: start;

  .tabbar-item::after {
    content: '';
    flex: 1;
  }
}
</style>
