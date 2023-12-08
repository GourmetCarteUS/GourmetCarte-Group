<script setup lang="ts">
import Layout from "@/components/layout/layout.vue";
import NavBar from "@/components/nav-bar/nav-bar.vue";
import UniIcons from "@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue";

</script>

<template>
  <Layout>
    <template #header>
      <NavBar title="活动报名小程序设计"/>
    </template>
    <view class="m-20">
      <view class="flex">
        <view>
          <view>企业真题第18期</view>
          <view>
            <view>进行中</view>
            <view>活动时：2.29-3.29</view>
          </view>
        </view>
        <view class="w-170 h-170 b-rd-20"></view>
      </view>
      <view class="bg-white p-40" style="border-radius: 50rpx 50rpx 0 0">
        <view class="mt-30">
          <view class="info-item">活动时间：小鳄鱼1</view>
          <view class="info-item">9.3km 江北石子山-北门</view>
        </view>

        <!--参与者列表，图像+名字，当前人数和剩余名额；点击可展开modal显示所有参与人员；-->
        <view>

        </view>

        <!-- 活动描述 -->
        <view>

        </view>
        <!-- 详情图片 -->
        <view>

        </view>


      </view>
    </view>
    <view class="flex center w-full justify-between bg-primary fixed bottom-0 p-40 pt-30 pb-50"
          style="box-sizing: border-box">
      <view class="center">
        <uni-icons type="redo-filled" size="22" class="mr-10"/>
        分享
      </view>
      <view class="bg-black text-white p-20 b-rd-50 pl-60 pr-60">
        <text class="text-32">参加活动</text>
      </view>
    </view>

  </Layout>
</template>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

</style>