<template>
  <Layout>
    <view class="p-30">
      <view style="border-bottom: 1px grey solid" class="flex center justify-between">
        <view class="w-200 h-200 b-rd-10 bg-amber">

        </view>
        <view class="ml-20">
          <view>12.13 重庆徒步</view>
          <view>观音桥-4号口</view>
        </view>
      </view>
      <view>距离活动前3小时随时可退</view>

      <view>
        <view class="flex justify-between">
          <view>价格（剩余10张）</view>
          <view></view>
        </view>
        <view class="flex justify-between">
          <view>支付金额</view>
          <view>$10.00</view>
        </view>
        <view class="flex justify-between">
          <view>支付方式</view>
          <view>微信</view>
        </view>
      </view>
      <view>
        <view>支付说明</view>
        <view>
          <view class="title">退换规则</view>
          <view>距离活动开始前3小时可以随时退出</view>
          <view>距离活动开始不足3小时与主办方协商退款</view>
        </view>
        <view>
          <view class="title">无条件退换规则</view>
          <view>天气恶略导致活动无法正常举行</view>
          <view>因不可抗力导致活动无法举办</view>
        </view>
        <view>
          <view class="title">免责声明</view>
          <view>因活动造成的意外损失风险自担，平台及活动放五任何责任，报名成功视为自愿受本声明约束。</view>
        </view>
      </view>
    </view>

    <view>
      <button class="bg-black">确认支付 $10.00</button>
    </view>
  </Layout>
</template>

<script setup lang="ts">

import Layout from "@/components/layout/layout.vue";
</script>

<style scoped lang="scss">

</style>