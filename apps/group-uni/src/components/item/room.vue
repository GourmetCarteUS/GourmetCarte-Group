<template>
  <view class="p-15 bg-white flex m-20 b-rd-4 min-h-270"
        @click="isClick && onGoPage({ name: 'room', params: { id: item?.id } })">
    <view style="flex: 2">
      <image :src="item?.picture" lazy-load mode="aspectFill" class="w-full h-full b-rd-5"/>
    </view>

    <view class="ml-20 flex-col flex-justify-between flex" style="flex: 3">
      <view>
        <view class="flex flex-justify-between">
          <view class="w-full">
            <view class="text-30 font-medium">{{ item?.name }}</view>
            <view v-if="item?.tag?.length">
              <text class="tag mr-10 green" style="display: inline-block" v-for="t in item.tag"
                    :key="`${item?.id}-${t}`">{{ t }}
              </text>
            </view>
          </view>

          <view class="status-red w-100" v-if="item?.useStatus == 1">
            <view class="text-center">
              {{ item?.orderEndTime }}
            </view>
            <view class="txt-2 text-center">
              使用中
            </view>
          </view>
          <view class="status-primary w-130" v-else-if="item?.useStatus == 2">
            <view class="text-center">
              仍可预订
            </view>
            <view class="txt-2 text-center">
              保洁中
            </view>
          </view>
          <view class="status-default w-120" v-else-if="item?.useStatus == 3">
            <view class="text-center">
              暂停预订
            </view>
            <view class="txt-2 text-center">
              维护中
            </view>
          </view>
          <view class="status-green w-100" v-else>
            <view class="text-center">
              可预定
            </view>
            <view class="txt-2 text-center">
              空闲中
            </view>
          </view>
        </view>

        <view class="text-gray text-24 mt-20 mb-20">
          {{ item?.intro }}
        </view>
      </view>

      <view>
        <view class="flex">
          <view v-for="i in 24" :key="`block${item?.id}-${i}`">
            <view class="block mr-5" :class="i<=item?.orderEndHour?'bg-primary':''"></view>
            <view class="text-15 text-gray center">{{ i }}</view>
          </view>
        </view>

        <view class="flex flex-justify-between">
          <view class="text-24 text-primary">
            <text class="text-30 font-medium">{{ item?.price }}</text>
            元/小时
          </view>

          <view class="flex">
            <view class="flex center text-24 text-gray mr-20">
              <view class="block mr-10"/>
              可预定时段
            </view>

            <!--            <view class="flex center text-24 text-gray">-->
            <!--              <view class="block mr-10 bg-primary" />-->
            <!--              已预定时段-->
            <!--            </view>-->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

.status-green {
  background: #55C291;
  border: 4rpx solid #55C291;
  border-radius: 10rpx;
  color: white;
  font-size: 24rpx;
  margin: auto 0;

  .txt-2 {
    background: white;
    border-radius: 0 0 8rpx 8rpx;
    color: #55C291;
    text-align: center;
  }
}

.status-red {
  background: #CF2F2F;
  border: 4rpx solid #CF2F2F;
  border-radius: 10rpx;
  color: white;
  font-size: 24rpx;
  margin: auto 0;

  .txt-2 {
    background: white;
    border-radius: 0 0 8rpx 8rpx;
    color: #CF2F2F;
  }
}

.status-default {
  background: #C7C7C7;
  border: 4rpx solid #C7C7C7;
  border-radius: 10rpx;
  color: white;
  font-size: 24rpx;
  margin: auto 0;

  .txt-2 {
    background: white;
    border-radius: 0 0 8rpx 8rpx;
    color: #C7C7C7;
  }
}

.status-primary {
  background: $uni-color-primary;
  border: 4rpx solid $uni-color-primary;
  border-radius: 10rpx;
  color: white;
  font-size: 24rpx;
  margin: auto 0;

  .txt-2 {
    background: white;
    border-radius: 0 0 8rpx 8rpx;
    color: $uni-color-primary;
  }
}

</style>
<script setup lang="ts">
import {onGoPage} from "@/utils/business";
import {UserRoomListModel} from 'cincore-common'

defineProps<{
  item: UserRoomListModel,
  isClick?: boolean
}>()
</script>