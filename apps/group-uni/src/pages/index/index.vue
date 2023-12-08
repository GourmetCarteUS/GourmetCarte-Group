<template>
  <Layout mode='none'>
    <template #header>
      <NavBar :backgroundColor="scrollTop>=150 ? 'white':undefined"/>
    </template>
    <z-paging ref="pagingRef" @query="queryList"
              :show-scrollbar="false" v-model="dataList" @scroll="onScroll">
      <view class="w-full" :style="{'margin-top': navHeight+'px'}">
        <swiper :current="current" @transition="swiperTransition" @animationfinish="swiperAnimationfinish">
          <swiper-item class="swiper-item bg-red" v-for="(item, index) in tabList" :key="index">
            xxx
          </swiper-item>
        </swiper>
      </view>

      <view class="sticky pb-20 bg-white" :style="{top: (navHeight-5)+'px'}">
        <z-tabs ref="tabsRef" :list="tabList" :current="current" @change="tabsChange"/>
        <view class="flex mt-20 ml-20">
          <view class="capsule-button bg-grey-sub">重庆市</view>
          <view class="capsule-button bg-grey-sub ml-20">全部时间</view>
        </view>
      </view>

      <view class="item" v-for="(item,index) in dataList" :key="index">
        <PostItem/>
      </view>
    </z-paging>
  </Layout>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useUserInfoStore} from "@/state/modules/user-info";
import {hideLoading, loading, toast} from "@/utils/uniapi/prompt";
import {onShareAppMessage, onShareTimeline} from "@dcloudio/uni-app";

import LogoUrl from "@/static/logo-2.png";
import NavBar from "@/components/nav-bar/nav-bar.vue";
import Layout from "@/components/layout/layout.vue";
import PostItem from "@/components/item/post.vue";

const navHeight = computed(() => {
  const navStyle = uni.getStorageSync("navStyle")
  return navStyle.statusBarHeight_ + navStyle.navBarHeight_ + 5
})

const location = computed(() => useUserInfoStore().location)

const tabList = [
      {
        name: '热门',
      },
      {
        name: '全部',
      },
      {
        name: '室内活动'
      },
      {
        name: '室外活动',
      },
      {
        name: 'KTV',
      },
      {
        name: '饭局'
      }
    ],
    current = ref(0),
    scrollTop = ref(0),
    tabsRef = ref(),
    dataList = ref([]);

function tabsChange(index: number) {
  current.value = index;
}

function swiperTransition(e: Event) {
  tabsRef.value.setDx(e.detail.dx);
}

function swiperAnimationfinish(e: Event) {
  current.value = e.detail.current;
  tabsRef.value.unlockDx();
}

function onScroll(env: Event) {
  scrollTop.value = env?.target?.scrollTop
}

const pagingRef = ref(),
    queryList = async (pageNo?: number, pageSize?: number) => {
      if (!location.value?.latitude) {
        await useUserInfoStore().getLocation()
      }
      loading()
      // const res = await view_shop_list({
      //   latitude: location.value?.latitude,
      //   longitude: location.value?.longitude,
      //   limit: pageSize,
      //   page: pageNo
      // })
      pagingRef.value.complete([1, 2, 3, 4]);
      hideLoading()
    };

onShareAppMessage(() => {
  return {
    title: '麻富无人茶室',
    desc: '麻富24小时自助无人茶室',
    path: `/pages/index/index`,
    imageUrl: LogoUrl,
  }
})

onShareTimeline(() => {
  return {
    title: '麻富无人茶室',
    desc: '麻富24小时自助无人茶室',
    path: `/pages/index/index`,
    imageUrl: LogoUrl,
  }
})

// useUserInfoStore().initUserInfo()
</script>

<style lang="scss" scoped>
@import "@/static/styles/common.scss";
</style>