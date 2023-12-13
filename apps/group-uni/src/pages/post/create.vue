<template>
  <Layout>
    <template #header>
      <NavBar title="创建活动"/>
    </template>
    <view class="bg-white m-40 p-40 b-rd-50">
      <view class="gc-title text-28 font-900 mb-30">发布新活动</view>
      <view class="mt-20">
        <view class="info-item">
          <view>活动名称</view>
          <view class="ml-20"><input type="text" placeholder="请输入活动名称"></view>
        </view>
        <view class="info-item">
          <view>活动地址</view>
          <view class="ml-20">请输入选择活动地址</view>
        </view>
        <view class="info-item">
          <view>活动时间</view>
          <view class="ml-20">
            <uni-datetime-picker :border="false">
              请选择活动开始时间
            </uni-datetime-picker>
          </view>
        </view>
      </view>

      <view class="gc-title text-28 font-900 mb-30 mt-40">活动介绍</view>
      <view class="m-10">
        <uni-easyinput type="textarea" autoHeight placeholder="请输入内容"/>
      </view>

      <view class="gc-title text-28 font-900 mb-20 mt-40">活动图片</view>
      <view class="m-20">
        <uni-file-picker limit="9" title="最多选择9张图片"/>
      </view>
    </view>

    <view class="flex center w-full justify-between bg-primary fixed bottom-0 p-40 pt-30 pb-50"
          style="box-sizing: border-box">
      <view class="flex-1">
        <label class="center">
          <checkbox value="cb" checked="true"/>
          <view class="text-24">
            已阅读《即时设计须知》并知悉参与活动的要求请在规定时间内上传~
          </view>
        </label>
      </view>
      <view class="bg-black text-white p-20 b-rd-50 pl-60 pr-60">
        <text class="text-32">提交</text>
      </view>
    </view>
  </Layout>
</template>
<script setup lang="ts">

import Layout from "@/components/layout/layout.vue";
import NavBar from "@/components/nav-bar/nav-bar.vue";
</script>
<style scoped lang="scss">
@import "@/static/styles/common.scss";

</style>