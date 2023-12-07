<script setup lang="ts">
import Card from "@/components/card/card.vue";

</script>

<template>
  <Card styles="m-20">
    <template #title>
      <view class="text-primary text-32 font-500">消费</view>
    </template>
    <template #sub-title>
      <view class="color-red text-28">-21.21元</view>
    </template>
    <template #body>
      <view class="text-24 text-gray p-20 pb-0">
        <view class="flex flex-justify-between mb-10">
          <text>充值时间</text>
          <text>2021-12-12 19:32:44</text>
        </view>

        <view class="flex flex-justify-between">
          <text>交易编号</text>
          <text>1232111111111123</text>
        </view>
      </view>
    </template>
  </Card>
</template>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

.color-red {
  color: #CF2F2F;
}

.color-green {
  color: #55C291;
}

</style>