<template>
  <view class="flex m-20 h-800 mb-10 b-rd-8 overflow-hidden min-h-250" @click="onGoPage({name: 'hub'}, false)">

    <view class="w-400 relative overflow-hidden"
          :style="`background: url(${item?.picture.length?item?.picture[0]:undefined}) center center/cover`">
      <text class="absolute text-26 p-4 pl-10 pr-10 text-white bg-primary" v-if="item?.tag.length">
        {{ item.tag[0] }}
      </text>
      <view class="absolute bottom-0 text-26 p-4 text-white bg-white-500 pl-10" v-if="item?.describe">
        <view :class="item.describe.length>20?'animate':undefined">
          {{ item.describe }}
        </view>
      </view>
    </view>

    <view class="bg-white p-20 w-full flex flex-col flex-justify-between">
      <view>
        <view class="flex flex-justify-between">
          <view class="text-30 font-medium">
            {{ item?.name }}
          </view>
          <view class="flex center">
            <CincoreIcon size="24rpx" class="center mr-10" type="dingwei"/>
            <text class="text-gray text-24">{{ item?.distance }}</text>
          </view>
        </view>
        <view class="text-gray text-24 flex flex-items-start mt-10">
          <CincoreIcon size="24rpx" class="center mr-10 mt-5" type="dizhi"/>
          {{ item?.region + item?.address }}
        </view>
        <!--        <view class="text-primary text-24 mt-5 mb-5">-->
        <!--          {{ item?.lastOrderTime }}小时前有人下单 | 已售{{ item?.saleOrderNums }}单-->
        <!--        </view>-->
      </view>
      <view class="text-24 flex flex-justify-between mt-10">
        <view class="room-num"
              :class="(item?.freeNum && item?.freeNum >= Math.ceil(item?.totalNum/2)) ?'green':'red'">
          空闲{{ item?.freeNum }}/{{ item?.totalNum }}
        </view>
        <view class="text-white bg-primary room-num" @click.stop="openMap">
          导航
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

.bg-white-500 {
  background-color: rgba(52, 47, 38, 0.58);
  white-space: nowrap;
  width: 100%;
}

.room-num {
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
  font-size: 24rpx;
  letter-spacing: 1rpx;
  text-align: center;
}

.animate {
  display: inline-block;
  white-space: nowrap;
  animation: 10s wordsLoop linear infinite normal;
}

@keyframes wordsLoop {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>

<script setup lang="ts">
import {UserShopListModel} from 'cincore-common'
import CincoreIcon from "@/components/cincore-icon/index.vue";
import {onGoPage} from "@/utils/business";
import {toast} from "@/utils/uniapi/prompt";

defineProps<{
  item: UserShopListModel
}>()

function openMap() {
  toast("导航")
}
</script>