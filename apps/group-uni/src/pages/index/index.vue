<template>
  <Layout mode='none'>
    <template #header>
      <NavBar :backgroundColor="scrollTop>=150 ? 'white':undefined"/>
    </template>

    <z-paging ref="pagingRef" @query="queryList" auto-show-back-to-top
              :show-scrollbar="false" v-model="dataList" @scroll="onScroll">
      <view class="bg-amber w-full" :style="{'margin-top': navHeight}">
        <swiper :current="current" @transition="swiperTransition" @animationfinish="swiperAnimationfinish">
          <swiper-item class="swiper-item bg-red" v-for="(item, index) in tabList" :key="index">
            xxx
          </swiper-item>
        </swiper>
      </view>

      <view style="position: sticky; top: 170rpx">
        <z-tabs ref="tabsRef" :list="tabList" :current="current" @change="tabsChange"/>
      </view>

      <view class="item h-800" v-for="(item,index) in dataList" :key="index">
        <view class="item-title">{{ item }}</view>
      </view>
    </z-paging>

    <!--<template #bottom>-->
    <!--  <view class="flex flex-justify-between safe-margin-bottom text-32 m-20">-->
    <!--    <view class="h-100 bg-primary b-rd-20 text-white center" style="flex: 3" @click="openScanCode">-->
    <!--      <uni-icons type="scan" color="white" size="30" class="mr-10"/>-->
    <!--      扫码充电-->
    <!--    </view>-->
    <!--    &lt;!&ndash;          <view class="h-100 flex-1 ml-10 bg-primary b-rd-20 text-white center" @click="onGoPage({name: 'mine'})">&ndash;&gt;-->
    <!--    &lt;!&ndash;            房间续费&ndash;&gt;-->
    <!--    &lt;!&ndash;          </view>&ndash;&gt;-->
    <!--  </view>-->
    <!--</template>-->
    <!--</z-paging>-->
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
import {getUrlParams, onGoPage} from "@/utils/business";

const navHeight = computed(() => {
  const navStyle = uni.getStorageSync("navStyle")
  return navStyle.statusBarHeight_ + navStyle.navBarHeight_ + 5 + 'px'
})
const location = computed(() => useUserInfoStore().location)

const tabsRef = ref();

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
    scrollTop = ref(0);

const dataList = ref([]);

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
  console.log("sc滚动", scrollTop.value)
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

function openScanCode() {
  uni.scanCode({
    success: function (res) {
      if (res.result) {
        const id = getUrlParams(res.result, "id")
        if (id) onGoPage({name: "room", params: {id}}, true);
        else toast("扫码失败")
      }
    },
    fail: function (result) {
      toast("扫码失败")
      console.log(result)
    }
  });
}

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