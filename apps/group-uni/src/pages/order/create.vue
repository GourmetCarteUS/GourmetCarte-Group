<template>
  <Layout>
    <template #header>
      <NavBar title="活动报名小程序设计"/>
    </template>
    <view class="bg-white m-40 p-40 b-rd-50">
      <view class="flex center justify-start pb-20 mb-20" style="border-bottom: 1rpx solid #e8e8e8">
        <view class="w-150 h-150 b-rd-10 bg-amber"></view>
        <view class="ml-20">
          <view class="mb-10 text-40 font-900">12.13 重庆徒步</view>
          <view class="text-gray-6 text-24 center justify-start">
            <uni-icons type="location-filled" size="20"/>
            观音桥-4号口
          </view>
        </view>
      </view>
      <view class="bg-green bg-opacity-50 pl-20 p-10 b-rd-20 mb-20 center justify-start text-28">
        <uni-icons type="info-filled" size="20" color="green" class="pr-20"/>
        距离活动前3小时随时可退
      </view>
      <view class="mt-30" style="border-bottom: 2rpx solid #e8e8e8">
        <view class="flex justify-between">
          <view class="item-title">价格
            <text class="text-gray text-26">（剩余{{ orderData?.maxNumber || 0 }}张）</text>
          </view>
          <view>
            <uni-number-box v-model="orderForm.num" min="1" :max="orderData?.maxNumber"/>
          </view>
        </view>
        <view class="flex justify-between mt-20">
          <view class="item-title">支付金额</view>
          <view class="text-red-6 font-400">${{ totalPrice }}</view>
        </view>
      </view>
      <view class="mt-20">
        <view class="text-30 mb-20 pt-20">支付说明</view>
        <view>
          <view>
            <view class="title">退换规则</view>
            <view class="ul">
              <view class="li">距离活动开始前3小时可以随时退出</view>
              <view class="li">距离活动开始不足3小时与主办方协商退款</view>
            </view>
          </view>
          <view>
            <view class="title">无条件退换规则</view>
            <view class="ul">
              <view class="li">天气恶略导致活动无法正常举行</view>
              <view class="li">因不可抗力导致活动无法举办</view>
            </view>
          </view>
          <view>
            <view class="title">免责声明</view>
            <view class="ul">
              <view class="li">因活动造成的意外损失风险自担，平台及活动放五任何责任，报名成功视为自愿受本声明约束。
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="flex center w-full justify-between bg-primary fixed bottom-0 p-40 pt-30 pb-50"
          style="box-sizing: border-box">
      <view class="flex-1">
        <label class="center justify-start">
          <checkbox value="cb" checked="true"/>
          <view class="text-24">
            授权手机号
          </view>
        </label>
      </view>
      <view class="bg-black text-white p-20 b-rd-50 pl-60 pr-60">
        <text class="text-32">确认支付 ${{ totalPrice }}</text>
      </view>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layout/layout.vue";
import NavBar from "@/components/nav-bar/nav-bar.vue";
import UniIcons from "@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import {computed, reactive} from "vue";

const orderData = reactive({
  unitPrice: 10,
  maxNumber: 10
})

const orderForm = reactive({
  num: 1
})

const totalPrice = computed(() => {
  return (orderForm.num * orderData.unitPrice).toFixed(2)
})
</script>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

.item-title {
  font-weight: 900;
  font-size: 30rpx;
  margin-bottom: 10rpx;
}

.title {
  font-weight: 900;
  font-size: 26rpx;
  margin-bottom: 10rpx;
}

.ul {
  margin-left: 20rpx;
  margin-bottom: 20rpx;

  .li {
    font-size: 24rpx;

    &:before {
      content: "*";
      margin-right: 10rpx;
    }
  }
}

</style>