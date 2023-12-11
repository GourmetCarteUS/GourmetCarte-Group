<script setup lang="ts">
import {computed, ref} from "vue";
import Layout from "@/components/layout/layout.vue";
import CincoreIcon from "@/components/cincore-icon/index.vue";
import {onGoPage, onGoReplace, onGoTab} from "@/utils/business";
import {useUserInfoStore} from "@/state/modules/user-info";
import type {UserInfo} from '@/api/user-info/user-info.types'
import Settings from "@/pages/mine/settings.vue";
import NavBar from "@/components/nav-bar/nav-bar.vue";
import TabBar from "@/components/tab-bar/tab-bar.vue";

// const userInfo = computed<UserInfo | null>(() => useUserInfoStore().user)
const dataList = ref([]), pagingRef = ref(),
    settingUserRef = ref(),
    scrollTop = ref(0);

const tabBarList = [
  {
    index: 1,
    title: "首页",
    icon: "home",
    handleClick: () => onGoTab({name: "main"}, false)
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
  }
]
const tabIndex = ref(3)

async function queryList(pageNo: number, pageSize: number) {
  // const {data} = await view_order_list({
  //   status: 'run',
  //   page: pageNo,
  //   limit: pageSize
  // })
  // orderTotal.value = data.data.total
  pagingRef.value.complete([1, 2, 3, 4]);
}

function onSetting() {
  // if (!userInfo.value) return router.push({name: "login"});
  settingUserRef.value.handleOpen();
}

const navHeight = computed(() => {
  const navStyle = uni.getStorageSync("navStyle")
  return navStyle.statusBarHeight_ + navStyle.navBarHeight_ + 5
})

function onScroll(env: Event) {
  scrollTop.value = env?.target?.scrollTop
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
}
uni.hideTabBar()
</script>

<template>
  <Layout>
    <template #header>
      <NavBar title="我的" :backgroundColor="scrollTop>=100 ? 'white':undefined"/>
    </template>

    <z-paging ref="pagingRef" @query="queryList" safe-area-inset-bottom use-safe-area-placeholder
              :show-scrollbar="false" v-model="dataList" @scroll="onScroll">
      <view class="user-info h-230 flex center justify-between pl-40 pr-50" :style="{'margin-top': navHeight+'px'}">
        <view>
          <view class="text-40 font-700 ml-30">小鳄鱼</view>
          <view class="capsule-button bg-primary-sub text-20 mt-20 text-black">
            <text class="pl-20 pr-20">已经连续参加18期</text>
          </view>
        </view>
        <view @click="onSetting">
          <view>
            <image class="w-160 h-160 b-rd-120" src="/static/avatar.png"/>
          </view>
        </view>
      </view>

      <view class="m-25 p-35 pb-0 b-rd-20 bg-white">
        <view class="title">资料信息</view>
        <view class="mt-30">
          <view class="user-info-item">报名参赛者：小鳄鱼1</view>
          <view class="user-info-item">手机号码：187010789087</view>
          <view class="user-info-item">收货地址：北京市紫禁城</view>
        </view>
        <view class="title mt-30">我的活动</view>
        <view class="mt-30">
          <view class="group-item mb-20" v-for="item in dataList" :key="item">
            <view>
              <text class="text-28 font-500">11月1日</text>
              <text class="text-24 ml-20 text-gray">共58人一起</text>
            </view>
            <view class="flex mt-20">
              <view class="w-200 h-200 b-rd-20">
                <image src="https://img.js.design/assets/img/641803bc0d016e025e84c54a.png" class="h-full w-full b-rd-20"
                       mode="aspectFill"/>
              </view>
              <view class="text-24 ml-20 flex-col flex justify-center">
                <view class="mb-20 text-30">11.1周六室外活动</view>
                <view class="mb-20 text-gray">卷卷户外</view>
                <view class="text-gray">花果山</view>
              </view>
            </view>
          </view>

        </view>
      </view>
      <template #bottom>
        <view style="z-index: 99" class="h-150">
          <TabBar v-model="tabIndex" :tab-bar-list="tabBarList"/>
        </view>
      </template>
    </z-paging>
  </Layout>

  <Settings ref="settingUserRef"/>
</template>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

.header {
  background: $uni-color-primary url("@/static/logo.png") no-repeat 120%/45%;
  padding: 50rpx 0 130rpx 60rpx;
}

.balance {
  border-right: 1px dashed #C7C7C7;
}

.tab {
  width: calc(100% - 100px);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.3);
  padding: 15rpx 50rpx 10rpx;
}

.title {
  display: flex;
  font-size: 28rpx;
  color: $uni-text-color;
  font-weight: 500;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;


  &:after {
    display: block;
    content: " ";
    width: 62rpx;
    height: 62rpx;
    background: linear-gradient(122.54deg, rgba(193, 247, 213, 1) 0%, rgba(220, 248, 166, 0) 100%);
    border-radius: 50%;
    position: absolute;
    transform: translateX(-10%) translateZ(-1px);
  }
}

.user-info-item {
  height: 94rpx;
  border-radius: 20rpx;
  background: rgba(165, 214, 63, .1);
  display: flex;
  align-items: center;
  padding-left: 20rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: $uni-text-color;
  font-weight: 500;
}

.group-item {
  border-radius: 20rpx;
  background: linear-gradient(180deg, rgba(243, 250, 230, 1) 0%, rgba(243, 250, 231, 0) 100%);
  padding: 20rpx;

}
</style>