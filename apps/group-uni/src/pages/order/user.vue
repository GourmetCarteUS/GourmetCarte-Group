<template>
  <Layout mode='none'>
    <template #header>
      <NavBar title="用户检票" :backgroundColor="scrollTop>=80 ? 'white':undefined"/>
    </template>

    <z-paging ref="pagingRef" @query="queryList"
              safe-area-inset-bottom use-safe-area-placeholder
              :show-scrollbar="false" v-model="dataList" @scroll="onScroll">

      <view class="flex justify-between center m-40" :style="{'margin-top': navHeight+'px'}">
        <view>
          <view class="text-40 font-900 ml-20">企业真题第18期</view>
          <view class="flex mt-20">
            <view class="capsule-button bg-primary-sub text-24">总人数：50</view>
            <view class="capsule-button bg-primary-sec text-24 ml-20">未检票人数：10</view>
          </view>
        </view>
        <view class="w-170 h-170 b-rd-20 mr-30">
          <image src="https://img.js.design/assets/img/641803bc0d016e025e84c54a.png"
                 class="h-full w-full b-rd-20"
                 mode="aspectFill"/>
        </view>
      </view>

      <view class="flex center justify-between bg-white m-40 p-20 b-rd-50" v-for="item in dataList" :key="item">
        <view class="flex center justify-start flex-1">
          <image class="w-120 h-120 b-rd-120" src="/static/avatar.png"/>
          <view class="ml-20 text-24">
            <view class="text-28 font-500 flex center justify-start">
              <view class="max-w-200 text-nowrap">用户名</view>
              <view class="text-26 text-gray">（5票）</view>
            </view>
            <view class="mt-10">13251341944</view>
          </view>
        </view>
        <view class="flex flex-col text-black text-28">
          <view>
            <checkbox checked disabled class="round primary"/>
            <text>用户已上车</text>
          </view>

          <label class="mt-10">
            <checkbox class="round primary"/>
            <text>检票</text>
          </label>
        </view>
      </view>
    </z-paging>

  </Layout>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {hideLoading, loading} from "@/utils/uniapi/prompt";

import Layout from "@/components/layout/layout.vue";
import NavBar from "@/components/nav-bar/nav-bar.vue";

const navHeight = computed(() => {
  const navStyle = uni.getStorageSync("navStyle")
  return navStyle.statusBarHeight_ + navStyle.navBarHeight_ + 20
})

const scrollTop = ref(0)

function onScroll(env: Event) {
  scrollTop.value = env?.target?.scrollTop
  if (scrollTop.value > 150) {
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
}

const pagingRef = ref(), dataList = ref([]),
    queryList = async (pageNo?: number, pageSize?: number) => {
      // if (!location.value?.latitude) {
      //   await useUserInfoStore().getLocation()
      // }
      loading()
      // const res = await view_shop_list({
      //   latitude: location.value?.latitude,
      //   longitude: location.value?.longitude,
      //   limit: pageSize,
      //   page: pageNo
      // })
      pagingRef.value.complete([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      hideLoading()
    };
</script>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

</style>