<template>
  <view class="post-container m-15 bg-white" @click="onGoPage({name: 'post-detail'}, false)">
    <view class="h-400">
      <image src="https://img.js.design/assets/img/641803bc0d016e025e84c54a.png" class="h-full w-full"/>
    </view>
    <view class="h-140 p-20 pb-0">
      <view class="font-500">活动报名小程序设计{{data}}</view>
      <view class="flex justify-between mt-20">
        <view class="flex">
          <view class="capsule-button bg-primary-sub mr-20">进行中</view>
          <view class="capsule-button bg-primary-sec mr-20">活动时间：</view>
        </view>
        <view class="capsule-button bg-black text-white">上车</view>
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