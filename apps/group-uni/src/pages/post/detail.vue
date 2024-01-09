<script setup lang="ts">
import Layout from '@/components/layout/layout.vue';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import UniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import { onLoad, onPageScroll, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { computed, reactive, ref } from 'vue';
import { isLogged, onBack, onGoPage } from '@/utils/business';
import { hideLoading, loading, toast } from '@/utils/uniapi/prompt';
import { edit_event_join, edit_event_quit, view_event_detail } from '@/api/event/evnet';
import { EventDetailData } from 'group-common';
import LogoUrl from '@/static/images/logo.png';
import { startAtFormat } from '@/utils/utils';
import { useUserInfoStore } from '@/state/modules/user-info';
import PopupShare from '@/components/dialog/popup-share.vue';

const startAt = computed(() => startAtFormat(currentData.startAt));

const postId = ref(),
    shareRef = ref(),
    currentData = reactive<Partial<EventDetailData>>({});

async function getEvent() {
    loading();
    const { data } = await view_event_detail(postId.value);
    if (data?.errorCode) {
        toast(data?.errorMessage || '暂无该数据', { complete: () => setTimeout(onBack, 1500) });
    } else {
        Object.assign(currentData, data!.data);
    }
    hideLoading();
}

/**
 * 订阅
 * @constructor
 */
function onSubscribe() {
    // return new Promise((resolve, reject) => {
    //     uni.getSetting({
    //         withSubscriptions: true,
    //         success(alwaysRes) {
    //             if (!alwaysRes.subscriptionsSetting.mainSwitch) {
    //                 //后台封禁了
    //                 //引导用户打开权限
    //                 uni.showModal({
    //                     title: '是否重新授权消息订阅功能',
    //                     success(res) {
    //                         if (res.confirm) {
    //                             uni.openSetting({
    //                                 success(res) {
    //                                     if (res.subscriptionsSetting) {
    //                                         toast('开启权限成功')
    //                                     }
    //                                 },
    //                                 fail() {
    //                                     toast('开启权限失败')
    //                                 },
    //                             })
    //                         } else if (res.cancel) {
    //                             toast('拒绝开启开启权限')
    //                         }
    //                     },
    //                 })
    //             } else {
    //                 resolve(true)
    //             }
    //         },
    //     })
    // })

    // TODO https://blog.csdn.net/qq_44718932/article/details/126130702
    return new Promise((resolve, reject) => {
        uni.requestSubscribeMessage({
            tmplIds: [
                'HtYFXDb6S8yLYOG1r4oGQGdjMiYOPVeFKuZISGNU7zY',
                'whvZi7swOrbC1TqXmz4Yr3zh9JhmbH-ruDkc3CAlrU0', // 活动进度提醒
            ],
            complete(res) {
                console.log(res);
                resolve(true);
            },
        });
    });
}

async function joinEvent() {
    if (!(await isLogged())) return;
    await onSubscribe();
    loading();
    const { data } = await edit_event_join(postId.value);
    hideLoading();
    if (!data?.success) {
        toast(data?.errorMessage || '上车失败');
    } else {
        toast('上车成功', {
            success: () =>
                setTimeout(() => {
                    onGoPage({ name: 'order-success', params: { id: postId.value } });
                }, 1500),
        });
    }
}

async function quitEvent() {
    loading();
    const { data } = await edit_event_quit(postId.value);
    hideLoading();
    if (!data?.success) {
        toast(data?.errorMessage || '下车失败');
    } else {
        toast('下车成功', {
            success: getEvent,
        });
    }
}

function openMap() {
    if (currentData?.geoLocation) {
        uni.openLocation({
            latitude: Number(currentData!.coordinate!.latitude),
            longitude: Number(currentData!.coordinate!.longitude),
            address: currentData?.location,
            name: currentData.location,
        });
    }
}

const scrollTop = ref(0);
const userInfo = computed(() => {
    return useUserInfoStore().user;
});
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
    if (scrollTop.value > 80) {
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
});
onLoad((params) => {
    if (params?.id) {
        postId.value = params?.id;
        getEvent();
    }
});
onShareAppMessage(() => {
    return {
        title: `${userInfo.value?.displayName}邀请您参加 ${currentData?.title} |『咕噜拼』`,
        path: `/pages/post/detail?id=${postId.value}`,
        imageUrl: currentData?.imageDescription?.[0] || LogoUrl,
    };
});
onShareTimeline(() => {
    return {
        title: `${userInfo.value?.displayName}邀请您参加 ${currentData?.title} |『咕噜拼』`,
        path: `/pages/post/detail?id=${postId.value}`,
        imageUrl: currentData?.imageDescription?.[0] || LogoUrl,
    };
});
</script>

<template>
    <Layout>
        <template #header>
            <view :class="currentData?.imageDescription?.length ? 'absolute' : ''">
                <NavBar :title="currentData?.title" :backgroundColor="scrollTop >= 80 ? 'white' : ''" />
            </view>
            <swiper circular indicator-dots autoplay indicator-color="#7f7eff" class="h-800" v-if="currentData?.imageDescription?.length">
                <swiper-item class="w-full h-1000" v-for="item in currentData?.imageDescription" :key="item">
                    <image :src="item" class="w-full h-full" mode="aspectFill" />
                </swiper-item>
            </swiper>
        </template>
        <view class="m-20 mb-160">
            <view class="flex justify-between center mb-30">
                <view>
                    <view class="text-40 font-900 ml-20">{{ currentData?.title }}</view>
                    <view class="flex mt-20">
                        <view v-if="currentData.isJoin" class="capsule-button processing text-24"> 已报名</view>
                        <view v-else-if="currentData?.status" class="capsule-button text-24 solved"> 已结束</view>
                        <view v-else class="capsule-button text-24 pending"> 未开始</view>
                        <view class="capsule-button bg-primary-sec text-24 ml-20">活动时间： <uni-dateformat :date="currentData?.startAt" /></view>
                        <view class="bg-primary rounded-full w-33 h-33 p-10 color-white text-center ml-20 text-24" v-if="!currentData?.isPublic">私</view>
                    </view>
                </view>
                <!--                <view class="w-170 h-170 b-rd-20 mr-30"></view>-->
            </view>
            <view class="bg-white p-30 b-rd-30">
                <view class="mt-30">
                    <view class="gc-item">活动时间：<uni-dateformat :date="currentData?.startAt" /></view>
                    <view class="gc-item" style="white-space: pre-wrap" @click="openMap">
                        <!--            <uni-icons type="location-filled" size="20" color="#39393A"/>-->
                        {{ currentData?.location }}
                    </view>
                </view>

                <!--参与者列表，图像+名字，当前人数和剩余名额；点击可展开modal显示所有参与人员；-->
                <view class="mt-30">
                    <view class="text-24 center justify-between">
                        <text class="text-gray">{{ currentData?.joinCount > 0 ? `${currentData?.joinCount}人一起` : `${currentData?.viewCount || 5}人想去` }} </text>
                        <text class="text-primary"> 仅剩{{ currentData?.maxParticipants - currentData?.participants?.length || 0 }}个名额 </text>
                    </view>
                    <view class="user-lists mt-20 grid grid-cols-5" v-if="currentData?.participants?.length">
                        <view class="user center flex-col" v-for="participant in currentData?.participants" :key="participant">
                            <view class="avatar w-100 h-100 mb-10">
                                <image :src="participant?.avatarUrl || LogoUrl" class="h-full w-full b-rd-50" mode="aspectFill" />
                            </view>
                            <view class="user-name text-gray text-24 text-nowrap w-100 text-center">
                                {{ participant?.displayName || '参与者' }}
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 活动描述 -->
                <view class="gc-title text-28 mt-40 mb-30">活动描述</view>
                <view class="text-26 font-400">
                    <view v-for="(desc, idx) in currentData?.description?.split('\n')" :key="idx + desc">
                        {{ desc }}
                    </view>
                </view>
                <!-- 详情图片 -->
                <template v-if="currentData?.imageDescription?.length">
                    <view class="gc-title text-28 mt-40 mb-30">详情图片</view>
                    <view class="w-full">
                        <image class="w-full" :src="img" v-for="img in currentData?.imageDescription" :key="img" mode="widthFix" />
                    </view>
                </template>
            </view>
        </view>
        <view class="flex center w-full justify-between bg-primary fixed bottom-0 p-40 pt-30 pb-50" style="box-sizing: border-box">
            <button class="center view-button" open-type="share">
                <uni-icons type="redo-filled" size="22" class="mr-10" />
                分享
            </button>

            <template v-if="currentData?.status">
                <view
                    class="bg-black text-white b-rd-50 p-20 w-300 ml-30 center"
                    @click="onGoPage({ name: 'post-create', params: { id: postId, type: 'new' } })"
                    v-if="currentData?.isMe"
                >
                    <text class="text-30 font-900">再次发车</text>
                </view>
            </template>
            <template v-else>
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center" @click="onGoPage({ name: 'post-create', params: { id: postId } })" v-if="currentData?.isMe">
                    <text class="text-30 font-900">编辑</text>
                </view>
                <template v-if="currentData?.isJoin">
                    <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center" @click="quitEvent">
                        <text class="text-30 font-900">下车</text>
                    </view>
                    <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center" @click="onGoPage({ name: 'order-success', params: { id: currentData.id } })">
                        <text class="text-30 font-900">票据</text>
                    </view>
                </template>
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center max-w-300" @click="joinEvent" v-else>
                    <text class="text-30 font-900">上车</text>
                </view>
            </template>
        </view>
    </Layout>
    <PopupShare ref="shareRef" />
</template>

<style scoped lang="scss">
@import '@/static/styles/common.scss';
</style>
