<template>
  <Layout>
    <template>
      <NavBar title="报名成功" :backgroundColor="scrollTop>=80 ? 'white':undefined"/>
    </template>
    <view>
      <view class="m-40">
        <view class="mb-40 center flex-col">
          <image src="https://img.js.design/assets/img/6556bcef90ab84325ba58b2b.png" class="w-300 mb-40"
                 mode="widthFix"/>
          <view class="text-36 font-500">恭喜您成功报名活动</view>
        </view>
        <view>
          <view class="info-item text-28 font-500">报名参赛者：小鳄鱼1</view>
          <!--          <view class="info-item text-28 font-500">手机号码：187010789087</view>-->
          <view class="info-item text-28 font-500">活动：活动报名小程序设计</view>
          <view class="info-item text-28 font-500">购买票数：5票</view>
        </view>
      </view>
      <view class="m-30">
        <view class="gc-title mb-30 text-36 font-500">活动答疑</view>
        <view class="bg-primary bg-opacity-10 b-rd-20 p-60">
          <view class="center flex-col">
            <image show-menu-by-longpress src="https://img.js.design/assets/img/6419450a30374b2d6e59a179.png"
                   class="w-300 h-300"/>
            <view class="text-26 font-500 text-center m-30">对活动有任何疑问：工具使用、挑战内容，都可以进群交流</view>
          </view>
          <view class="center flex-col">
            <image show-menu-by-longpress src="https://img.js.design/assets/img/6419450a30374b2d6e59a179.png"
                   class="w-300 h-300"/>
            <view class="text-26 font-500 text-center m-30">关注公众号「即时设计 UI 星球」获取奖励发放信息</view>
          </view>
        </view>
      </view>
    </view>
  </Layout>
</template>
<script setup lang="ts">
import Layout from "@/components/layout/layout.vue";
import NavBar from "@/components/nav-bar/nav-bar.vue";
import {onPageScroll} from "@dcloudio/uni-app";
import {ref} from "vue";

const scrollTop = ref(0)

onPageScroll(res => {
  scrollTop.value = res?.scrollTop
  if (scrollTop.value > 100) {
    uni.setNavigationBarColor({
      frontColor: '#000000',//黑
      backgroundColor: '#000000',
    })
  } else {
    uni.setNavigationBarColor({
      frontColor: '#ffffff',//白
      backgroundColor: '#ffffff'
    })
  }
})
</script>

<style scoped lang="scss">
@import "@/static/styles/common.scss";
</style>