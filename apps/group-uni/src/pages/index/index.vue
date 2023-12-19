<template>
    <Layout mode="none">
        <template #header>
            <NavBar :backgroundColor="scrollTop >= 150 ? 'white' : undefined" />
        </template>
        <z-paging ref="pagingRef" @query="queryList" safe-area-inset-bottom use-safe-area-placeholder :show-scrollbar="false" v-model="dataList" @scroll="onScroll">
            <view class="m-20" :style="{ 'margin-top': navHeight + 'px' }">
                <swiper class="rounded-20 overflow-hidden">
                    <swiper-item class="swiper-item w-full" v-for="item in bannerList" :key="item?.id">
                        <image :src="item.imgUrl" class="w-full" mode="widthFix" />
                    </swiper-item>
                </swiper>
            </view>

            <view style="z-index: 100" class="sticky pb-20" :class="{ 'bg-white': scrollTop >= 150 }" :style="{ top: navHeight - 5 + 'px' }">
                <z-tabs ref="tabsRef" :list="tabList" :current="current" @change="tabsChange" />
                <view class="flex mt-20 ml-20">
                    <view class="capsule-button text-24 bg-white">重庆市</view>
                    <view class="capsule-button text-24 bg-white ml-20" @click="datePickerRef?.show">全部时间</view>
                </view>
            </view>

            <view class="item" v-for="item in dataList" :key="item">
                <PostItem :data="item" />
            </view>
            <template #bottom>
                <view style="z-index: 10" class="">
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
import { computed, reactive, ref } from 'vue';
import { hideLoading, loading } from '@/utils/uniapi/prompt';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { IBanner, ICategory } from 'group-common';

import LogoUrl from '@/static/logo-2.png';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import Layout from '@/components/layout/layout.vue';
import PostItem from '@/components/item/post.vue';
import TabBar from '@/components/tab-bar/tab-bar.vue';
import { onGoPage, onGoTab } from '@/utils/business';
import { useUserInfoStore } from '@/state/modules/user-info';
import { view_banner, view_categories, view_events } from '@/api/event/evnet';

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

const tabList = ref<ICategory[]>([]),
    bannerList = ref<IBanner[]>([]),
    current = ref(0),
    scrollTop = ref(0),
    tabsRef = ref(),
    dataList = ref([]),
    filterForm = reactive<Partial<{ category: string }>>({});

function tabsChange(index: number) {
    filterForm.category = tabList.value[index].id;
    pagingRef.value.reload();
}

async function getCategories() {
    const { data } = await view_categories();
    tabList.value.push(
        ...[
            { id: 'all', name: '全部' },
            { id: 'hot', name: '热门' },
        ]
    );
    if (data?.success) data.data?.map((item: ICategory) => tabList.value.push(item));
}

async function getBanners() {
    const { data } = await view_banner();
    if (data?.success) bannerList.value = data.data || [];
}

const pagingRef = ref(),
    queryList = async (pageNo?: number, pageSize?: number) => {
        // if (!location.value?.latitude) {
        //   await useUserInfoStore().getLocation()
        // }
        loading();
        const { data } = await view_events({
            limit: pageSize,
            page: pageNo,
            ...filterForm,
        });
        if (data?.success) pagingRef.value.complete(data.data);
        hideLoading();
    };

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

onLoad(() => {
    getCategories();
    getBanners();
    useUserInfoStore().initUserInfo();
    uni?.hideTabBar();
});
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';
</style>
