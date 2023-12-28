<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import Layout from '@/components/layout/layout.vue';
import { onGoPage, onGoTab } from '@/utils/business';
import Settings from '@/pages/mine/settings.vue';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import TabBar from '@/components/tab-bar/tab-bar.vue';
import { useUserInfoStore } from '@/state/modules/user-info';
import { EventDetailData, IUser } from 'group-common';
import avatarUrl from '@/static/images/logo.png';
import { view_event_user } from '@/api/event/evnet';
import { hideLoading, loading } from '@/utils/uniapi/prompt';
import MinePost from '@/components/item/mine-post.vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

const dataList = ref<EventDetailData[]>([]),
    pagingRef = ref(),
    settingUserRef = ref(),
    scrollTop = ref(0),
    tabList = ref([
        { id: 'all', name: '全部' },
        { id: 'pending', name: '未开始' },
        { id: 'solved', name: '已结束' },
    ]),
    filterForm = reactive<{
        status: string;
    }>({
        status: 'all',
    });

const userInfo = computed(() => {
    return useUserInfoStore().user as IUser;
});

const tabBarList = [
    {
        index: 1,
        title: '首页',
        icon: 'home',
        handleClick: () => onGoTab({ name: 'main' }, false),
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
        active: true,
    },
];

async function queryList(pageNo: number, pageSize: number) {
    loading();
    const { data } = await view_event_user({
        page: pageNo,
        limit: pageSize,
        userId: userInfo.value?.id,
        ...filterForm,
    });
    hideLoading();
    if (data?.success) return pagingRef.value.complete(data.data);
}

function onSetting() {
    if (!userInfo.value) return onGoPage({ name: 'login' });
    settingUserRef.value.handleOpen();
}

const navHeight = computed(() => {
    const navStyle = uni.getStorageSync('navStyle');
    return navStyle.statusBarHeight_ + navStyle.navBarHeight_ + 5;
});

function tabsChange(index: number) {
    filterForm.status = tabList.value[index].id;
    pagingRef.value.reload();
}

function onScroll(env: Event) {
    scrollTop.value = env?.target?.scrollTop;
    if (scrollTop.value > 100) {
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

uni?.hideTabBar();
useUserInfoStore().initUserInfo();

onMounted(() => {
    if (!userInfo.value.avatarUrl || !userInfo.value.displayName) onSetting();
});
</script>

<template>
    <Layout>
        <template #header>
            <NavBar :is-back="false" title="我的" :backgroundColor="scrollTop >= 100 ? 'white' : undefined" />
        </template>

        <z-paging ref="pagingRef" safe-area-inset-bottom use-safe-area-placeholder @query="queryList" :show-scrollbar="false" v-model="dataList" @scroll="onScroll">
            <view class="user-info h-230 flex center justify-between pl-40 pr-50" :style="{ 'margin-top': navHeight + 'px' }">
                <view>
                    <view class="text-40 font-700 ml-30">{{ userInfo?.displayName }}</view>

                    <view class="capsule-button bg-primary-sub text-22 mt-20 text-black">
                        <text class="pl-20">上车{{ userInfo?.joinCount || 0 }}期</text>
                        <text class="pr-20">，发车{{ userInfo?.createCount || 0 }}期</text>
                    </view>
                </view>
                <view @click="onSetting">
                    <view>
                        <image class="w-160 h-160 b-rd-120" :src="userInfo?.avatarUrl || avatarUrl" />
                    </view>
                </view>
            </view>

            <view class="m-25 p-35 pb-0 b-rd-20 bg-white">
                <view class="gc-title text-28 font-500">资料信息</view>
                <view class="mt-30">
                    <view class="gc-item">报名参赛者：{{ userInfo?.displayName }}</view>
                    <view class="gc-item" v-if="userInfo?.contact">联系方式：{{ userInfo?.contact }}</view>
                    <!--                    <view class="gc-item" style="height: auto; overflow: initial; padding-left: 0">-->
                    <!--                        <uni-file-picker limit="9">-->
                    <!--                            <template #title="{ filesList, limitLength }">-->
                    <!--                                <view class="gc-item-before justify-between m-0 pr-20" style="background: transparent">-->
                    <!--                                    <text>个人相册</text>-->
                    <!--                                    <text class="text-gray">{{ filesList?.length }}/{{ limitLength }}</text>-->
                    <!--                                </view>-->
                    <!--                            </template>-->
                    <!--                        </uni-file-picker>-->
                    <!--                    </view>-->
                </view>
                <view class="gc-title mt-60 text-28 font-500">我的活动</view>
                <view class="mt-30">
                    <view style="z-index: 100" class="sticky" :class="{ 'bg-white': scrollTop >= 150 }" :style="{ top: navHeight - 5 + 'px' }">
                        <z-tabs ref="tabsRef" :list="tabList" @change="tabsChange" />
                    </view>
                    <MinePost v-for="item in dataList" :key="item.id" :data="item" />
                </view>
            </view>
            <template #bottom>
                <view style="z-index: 10" class="">
                    <TabBar :tab-bar-list="tabBarList" />
                </view>
            </template>
        </z-paging>
    </Layout>

    <Settings ref="settingUserRef" />
</template>

<style scoped lang="scss">
@import '@/static/styles/common.scss';

:deep {
    .uni-file-picker__container {
        padding: 20rpx;
    }
}
</style>
