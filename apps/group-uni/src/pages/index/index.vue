<template>
  <Layout mode='none'>
    <template #header>
      <NavBar :backgroundColor="scrollTop>=150 ? 'white':undefined"/>
    </template>
    <z-paging ref="pagingRef" @query="queryList" safe-area-inset-bottom use-safe-area-placeholder
              :show-scrollbar="false" v-model="dataList" @scroll="onScroll">
      <view class="w-full" :style="{'margin-top': navHeight+'px'}">
        <swiper :current="current" @transition="swiperTransition" @animationfinish="swiperAnimationFinish">
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

      <view class="item" v-for="item in dataList" :key="item">
        <PostItem :data="item"/>
      </view>
      <template #bottom>
        <view style="z-index: 99" class="h-150">
          <TabBar :tab-bar-list="tabBarList"/>
        </view>
      </template>
    </z-paging>
  </Layout>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {hideLoading, loading} from "@/utils/uniapi/prompt";
import {onShareAppMessage, onShareTimeline} from "@dcloudio/uni-app";

import LogoUrl from "@/static/logo-2.png";
import NavBar from "@/components/nav-bar/nav-bar.vue";
import Layout from "@/components/layout/layout.vue";
import PostItem from "@/components/item/post.vue";
import TabBar from "@/components/tab-bar/tab-bar.vue";
import {onGoPage, onGoReplace, onGoTab} from "@/utils/business";

const navHeight = computed(() => {
  const navStyle = uni.getStorageSync("navStyle")
  return navStyle.statusBarHeight_ + navStyle.navBarHeight_ + 5
})

const tabBarList = [
  {
    index: 1,
    title: "首页",
    icon: "home",
    handleClick: () => {
    }
  },
  {
    index: 2,
    title: "",
    icon: "plusempty",
    float: true,
    handleClick: () => onGoPage({name: "scan"}, false)
  },
  {
    index: 3,
    title: "我的",
    icon: "person",
    handleClick: () => onGoTab({name: "mine"}, false)
  }
]

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
    dataList = ref([1, 2, 3, 4, 5]);

function tabsChange(index: number) {
  current.value = index;
}

function swiperTransition(e: Event) {
  tabsRef.value.setDx(e.detail.dx);
}

function swiperAnimationFinish(e: Event) {
  current.value = e.detail.current;
  tabsRef.value.unlockDx();
}

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

const pagingRef = ref(),
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
uni.hideTabBar()
</script>

<style lang="scss" scoped>
@import "@/static/styles/common.scss";
</style>