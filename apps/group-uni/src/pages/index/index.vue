<template>
    <Layout mode="none">
        <template #header>
            <NavBar :backgroundColor="scrollTop >= 150 ? 'white' : undefined" />
        </template>
        <z-paging ref="pagingRef" @query="queryList" safe-area-inset-bottom use-safe-area-placeholder :show-scrollbar="false" v-model="dataList" @scroll="onScroll">
            <view class="w-full" :style="{ 'margin-top': navHeight + 'px' }">
                <swiper :current="current" @transition="swiperTransition" @animationfinish="swiperAnimationFinish">
                    <swiper-item class="swiper-item bg-red" v-for="(item, index) in tabList" :key="index"> xxx </swiper-item>
                </swiper>
            </view>

            <view style="z-index: 100" class="sticky pb-20 bg-white" :style="{ top: navHeight - 5 + 'px' }">
                <z-tabs ref="tabsRef" :list="tabList" :current="current" @change="tabsChange" />
                <view class="flex mt-20 ml-20">
                    <view class="capsule-button text-24 bg-grey-sub">重庆市</view>
                    <view class="capsule-button text-24 bg-grey-sub ml-20" @click="datePickerRef?.show">全部时间</view>
                </view>
            </view>

            <view class="item" v-for="item in dataList" :key="item">
                <PostItem :data="item" />
            </view>
            <template #bottom>
                <view style="z-index: 10" class="h-150">
                    <TabBar :tab-bar-list="tabBarList" />
                    <view style="position: absolute; bottom: 1000px">
                        <uni-datetime-picker ref="datePickerRef" type="daterange"></uni-datetime-picker>
                    </view>
                </view>
            </template>
        </z-paging>
    </Layout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { hideLoading, loading } from '@/utils/uniapi/prompt';
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

import LogoUrl from '@/static/logo-2.png';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import Layout from '@/components/layout/layout.vue';
import PostItem from '@/components/item/post.vue';
import TabBar from '@/components/tab-bar/tab-bar.vue';
import { onGoPage, onGoTab } from '@/utils/business';

const navHeight = computed(() => {
    const navStyle = uni.getStorageSync('navStyle');
    return navStyle.statusBarHeight_ + navStyle.navBarHeight_ + 5;
});
const datePickerRef = ref();

const tabBarList = [
    {
        index: 1,
        title: '首页',
        icon: 'home',
        active: true,
    },
    {
        index: 2,
        title: '',
        icon: 'plusempty',
        float: true,
        handleClick: () => onGoPage({ name: 'post-create' }),
    },
    {
        index: 3,
        title: '我的',
        icon: 'person',
        handleClick: () => onGoTab({ name: 'mine' }),
    },
];

const tabList = [
        {
            name: '热门',
        },
        {
            name: '全部',
        },
        {
            name: '室内活动',
        },
        {
            name: '室外活动',
        },
        {
            name: 'KTV',
        },
        {
            name: '饭局',
        },
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

function swiperAnimationFinish(e: Event) {
    current.value = e.detail.current;
    tabsRef.value.unlockDx();
}

function onScroll(env: Event) {
    scrollTop.value = env?.target?.scrollTop;
    if (scrollTop.value > 150) {
        uni.setNavigationBarColor({
            frontColor: '#000000', //黑
            backgroundColor: '#000000',
        });
    } else {
        uni.setNavigationBarColor({
            frontColor: '#ffffff', //白
            backgroundColor: '#ffffff',
        });
    }
}

const pagingRef = ref(),
    queryList = async (pageNo?: number, pageSize?: number) => {
        // if (!location.value?.latitude) {
        //   await useUserInfoStore().getLocation()
        // }
        loading();
        // const res = await view_shop_list({
        //   latitude: location.value?.latitude,
        //   longitude: location.value?.longitude,
        //   limit: pageSize,
        //   page: pageNo
        // })
        pagingRef.value.complete([
            {
                id: 1,
                name: '1号活动',
                status: 'processing',
                isJoin: true,
                isMe: true,
            },
            {
                id: 2,
                name: '2号活动',
                status: 'pending',
                isJoin: true,
                isMe: true,
            },
            {
                id: 3,
                name: '3号活动',
                status: 'pending',
                isJoin: true,
                isMe: true,
            },
            {
                id: 4,
                name: '4号活动',
                status: 'solved',
                isJoin: true,
                isMe: true,
            },
        ]);
        hideLoading();
    };

onShareAppMessage(() => {
    return {
        title: '麻富无人茶室',
        desc: '麻富24小时自助无人茶室',
        path: `/pages/index/index`,
        imageUrl: LogoUrl,
    };
});

onShareTimeline(() => {
    return {
        title: '麻富无人茶室',
        desc: '麻富24小时自助无人茶室',
        path: `/pages/index/index`,
        imageUrl: LogoUrl,
    };
});

// useUserInfoStore().initUserInfo()
uni?.hideTabBar();
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';
</style>
