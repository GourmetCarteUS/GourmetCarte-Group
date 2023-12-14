<script setup lang="ts">
import {computed, ref} from "vue";
import Layout from "@/components/layout/layout.vue";
import {onGoPage, onGoTab} from "@/utils/business";
import Settings from "@/pages/mine/settings.vue";
import NavBar from "@/components/nav-bar/nav-bar.vue";
import TabBar from "@/components/tab-bar/tab-bar.vue";

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
    handleClick: () => onGoPage({name: "post-create"}, false)
  },
  {
    index: 3,
    title: "我的",
    icon: "person",
    active: true
  }
]
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

uni?.hideTabBar()
</script>

<template>
  <Layout>
    <template #header>
      <NavBar :is-back="false" title="我的" :backgroundColor="scrollTop>=100 ? 'white':undefined"/>
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
        <view class="gc-title text-28 font-500">资料信息</view>
        <view class="mt-30">
          <view class="gc-item-before">报名参赛者：小鳄鱼1</view>
          <view class="gc-item-before">手机号码：187010789087</view>
          <view class="gc-item" style="height: auto; overflow: initial; padding-left: 0">
            <uni-file-picker limit="9">
              <template #title="{filesList, limitLength}">
                <view class="gc-item-before justify-between m-0 pr-20" style="background: transparent">
                  <text>个人相册</text>
                  <text class="text-gray">{{ filesList?.length }}/{{ limitLength }}</text>
                </view>
              </template>
            </uni-file-picker>
          </view>
        </view>
        <view class="gc-title mt-60 text-28 font-500">我的活动</view>
        <view class="mt-30">
          <view class="group-item b-rd-20 p-20 mb-20" v-for="i in 10"
                @click="onGoPage({name: 'post-detail', params:{id: i.toString()}}, false)">
            <view class="flex mb-10">
              <view class="w-150 h-170 b-rd-20">
                <image src="https://img.js.design/assets/img/641803bc0d016e025e84c54a.png" class="h-full w-full b-rd-20"
                       mode="aspectFill"/>
              </view>
              <view class="text-24 ml-20 flex-col flex justify-center">
                <view class="mb-20 flex justify-between">
                  <view class="flex-1">
                    <view class="text-30 font-900 text-nowrap w-250">11.1周六室外活动1周六室外活动1周六室外活动</view>
                    <view class="text-gray">重庆市xxxxxx</view>
                  </view>
                  <view>共58人一起</view>
                </view>
                <view class="flex">
                  <view class="capsule-button bg-primary-sub">进行中</view>
                  <view class="capsule-button bg-primary-sec ml-20">活动时：2.29-3.29</view>
                </view>
              </view>
            </view>
            <!--            <view class="flex">-->
            <!--              <view class="capsule-button bg-error text-white w-full text-center">下车 (5票)</view>-->
            <!--              <view class="capsule-button bg-warning text-white w-full ml-20 text-center">验票 (5票)</view>-->
            <!--            </view>-->
          </view>
        </view>
      </view>
      <template #bottom>
        <view style="z-index: 99" class="h-150">
          <TabBar :tab-bar-list="tabBarList"/>
        </view>
      </template>
    </z-paging>
  </Layout>

  <Settings ref="settingUserRef"/>
</template>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

.group-item {
  background: linear-gradient(180deg, rgba($uni-color-primary, .2) 0%, rgba(243, 250, 231, 0) 100%);
}

:deep {
  .uni-file-picker__container {
    padding: 20rpx;
  }
}
</style>