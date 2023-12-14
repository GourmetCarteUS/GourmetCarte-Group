<template>
  <view class="post-container m-20 mb-0 bg-white" @click="onGoPage({name: 'post-detail', params: {id: data?.id}}, false)">
    <image src="https://img.js.design/assets/img/641803bc0d016e025e84c54a.png" class="max-h-400 w-full"
           mode="widthFix"/>
    <view class="p-20">
      <view class="flex justify-between center">
        <text class="font-500 flex-1 mr-10 text-nowrap">{{ data?.name }}</text>
        <text class="text-24 text-gray">16人已上车</text>
      </view>
      <view class="flex justify-between mt-20">
        <view class="flex">
          <view class="capsule-button text-24 bg-primary-sub mr-20" :class="data?.status">{{ data?.status == 'processing' ? '进行中' : data?.status == 'pending' ? '未开始' : '已结束' }}</view>
          <view class="capsule-button text-24 bg-primary-sec mr-20">活动时间：</view>
        </view>
        <view class="capsule-button text-28 bg-black text-white">上车</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {onGoPage} from "@/utils/business";

defineProps<{ data: number }>()
</script>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

.post-container {
  border: 1px solid rgba(235, 236, 237, 1);
  border-radius: 20rpx;
  overflow: hidden;
}
</style>