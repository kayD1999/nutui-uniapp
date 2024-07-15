<!--
 * @Description: 宏观市场
 * @Version: 1.0
 * @Author: 
 * @Date: 2024-04-25 17:37
 * @FilePath: /src/pages/index/macroMarket.vue
-->
<template>
  <k-card title="宏观市场" right-title="数据日期：2024-04-15">
    <view class="progressBox">
      <nut-cell>
        <span class="leftText">市场情绪</span>
        <view class="progress">
          <nut-progress size="small" :percentage="62.16" :text-inside="true" stroke-color="#0C6BD8">
            <span class="tipContent num">62.16%</span>
          </nut-progress>
        </view>
        <view>
          <text class="rightText">
            <text class="smooth">情绪平稳</text>
          </text>
        </view>
      </nut-cell>
    </view>
    <nut-cell class="macroscopic">
      <div class="market">
        北上资金流入<text style="color: rgb(228 54 51)">1040.00亿</text>，流出<text style="color: rgb(228 54 51)"
          >1090.55亿</text
        >，净流入<text style="color: rgb(31 170 61)">-50.55亿</text>
      </div>
    </nut-cell>
    <nut-cell class="macroscopic">
      <div class="market">
        南下资金流入<text style="color: rgb(228 54 51)">840.00亿</text>，流出<text style="color: rgb(228 54 51)"
          >762.95亿</text
        >，净流入<text style="color: rgb(228 54 51)">77.05亿</text>
      </div>
    </nut-cell>
  </k-card>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'MacroMarket',
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.progressBox {
  display: flex;
  justify-content: space-around;

  .nut-cell {
    padding: 16upx 24upx;
  }

  .leftText,
  .rightText {
    width: auto;
    min-width: 100.46upx;
    font-size: 24upx;
    line-height: 36upx;
    font-weight: 400;
    color: #242e43;
  }

  .rightText {
    .high {
      color: #e43633;
    }

    .smooth {
      color: #0c6bd8;
    }

    .low {
      color: #1faa3d;
    }
  }
}

.progress {
  flex: 1;
  width: 100%;
  padding: 0 32upx;
  display: flex;
  align-items: center;

  .tipContent {
    background-color: #fff;
    padding: 4upx 15upx;
    border-radius: 50%;
    color: #0c6bd8;
    box-shadow: 0 2px 6px 0 #b0b1bf;
  }
}

.market {
  font-size: 24upx;
}
</style>
