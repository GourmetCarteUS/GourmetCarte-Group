<script setup lang="ts">
import Layout from '@/components/layout/layout.vue';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import UniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';
import {onLoad, onPageScroll} from '@dcloudio/uni-app';
import {computed, reactive, ref} from 'vue';
import {onBack, onGoPage} from '@/utils/business';
import {toast} from '@/utils/uniapi/prompt';
import {view_event_detail} from "@/api/event/evnet";
import {IEvent} from 'group-common'

const status = computed(() => {
    // 未开始
    if (currentData?.status == 'pending') {
        if (currentData?.isMe) {
            // 编辑、检票
            return 1;
        } else if (currentData?.isJoin) {
            // 票据、上车
            return 2;
        } else {
            // 上车
            return 3;
        }
        // 进行中
    } else if (currentData?.status == 'processing') {
        if (currentData?.isMe) {
            // 检票
            return 4;
        } else if (currentData?.isJoin) {
            // 票据
            return 5;
        } else {
            // 只有分享
            return 0;
        }
        // 已结束
    } else if (currentData?.status == 'solved') {
        if (currentData?.isMe) {
            // 检票、再发起
            return 6;
        } else if (currentData?.isJoin) {
            // 票据
            return 4;
        } else {
            // 只有分享
            return 0;
        }
    }
    return 0;
});

const startAtFormat = computed(() => {
    if (!currentData.startAt) return
    const d = new Date(Date.parse(currentData.startAt));
    return d.toISOString();
})

const postId = ref(),
    currentData = reactive<Partial<IEvent>>({});

async function getEvent() {
    const {data} = await view_event_detail(postId.value)
    if (data?.errorCode) {
        return toast(data?.errorMessage || '暂无该数据', {complete: () => setTimeout(onBack, 1500)});
    } else {
        Object.assign(currentData, data!.data);
    }
}

const scrollTop = ref(0);
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
        getEvent()
    }
});
</script>

<template>
    <Layout>
        <template #header>
            <NavBar :title="currentData?.title" :backgroundColor="scrollTop >= 80 ? 'white' : undefined"/>
        </template>
        <view class="m-20 mb-160">
            <view class="flex justify-between center mb-30">
                <view>
                    <view class="text-40 font-900 ml-20">{{ currentData?.title }}</view>
                    <view class="flex mt-20">
                        <view class="capsule-button text-24" :class="currentData?.status">{{
                                currentData?.status == 'processing' ? '进行中' : currentData?.status == 'pending' ? '未开始'
                                    : '已结束'
                            }}
                        </view>
                        <view class="capsule-button bg-primary-sec text-24 ml-20">活动时： {{ startAtFormat }}
                        </view>
                    </view>
                </view>
                <!--                <view class="w-170 h-170 b-rd-20 mr-30"></view>-->
            </view>
            <view class="bg-white p-30 b-rd-30">
                <view class="mt-30">
                    <view class="gc-item">活动时间：{{ startAtFormat }}</view>
                    <view class="gc-item">
                        <!--            <uni-icons type="location-filled" size="20" color="#39393A"/>-->
                        {{ currentData?.location }}
                    </view>
                </view>

                <!--参与者列表，图像+名字，当前人数和剩余名额；点击可展开modal显示所有参与人员；-->
                <view class="mt-30">
                    <view class="text-24 center justify-between">
                        <text class="text-gray">{{
                                currentData?.participants?.length > 0 ? `${currentData?.participants?.length}人一起` :
                                    `${currentData?.viewCount || 5}人想去`
                            }}
                        </text>
                        <text class="text-primary">仅剩{{
                                (currentData?.maxParticipants - currentData?.participants?.length) || 0
                            }}个名额
                        </text>
                    </view>
                    <view class="user-lists mt-20 grid grid-cols-5" v-if="currentData?.participants?.length">
                        <view class="user center flex-col" v-for="participant in currentData?.participants">
                            <view class="avatar w-100 h-100 mb-10">
                                <image :src="participant?.avatarUrl"
                                       class="h-full w-full b-rd-50" mode="aspectFill"/>
                            </view>
                            <view class="user-name text-gray text-24 text-nowrap w-100">{{
                                    participant?.displayName || '参与者'
                                }}
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 活动描述 -->
                <view class="gc-title text-28 mt-40 mb-30">活动描述</view>
                <view class="text-26 font-400">
                    <view v-for="(desc, idx) in currentData?.description.split('\n')" :key="idx+desc">
                        {{ desc }}
                    </view>
                </view>
                <!-- 详情图片 -->
                <template v-if="currentData?.imageDescription?.length">
                    <view class="gc-title text-28 mt-40 mb-30">详情图片</view>
                    <view class="w-full">
                        <image class="w-full" :src="img" v-for="img in currentData?.imageDescription" :key="img"/>
                    </view>
                </template>
            </view>
        </view>
        <view class="flex center w-full justify-between bg-primary fixed bottom-0 p-40 pt-30 pb-50"
              style="box-sizing: border-box">
            <view class="center">
                <uni-icons type="redo-filled" size="22" class="mr-10"/>
                分享
            </view>

            <template v-if="status === 1">
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
                      @click="onGoPage({ name: 'post-create', params: { id: '1' } }, false)">
                    <text class="text-30 font-900">编辑</text>
                </view>
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
                      @click="onGoPage({ name: 'order-user', params: { id: '1' } }, false)">
                    <text class="text-30 font-900">检票</text>
                </view>
            </template>
            <template v-else-if="status === 2">
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
                      @click="onGoPage({ name: 'order-success', params: { id: '1' } }, false)">
                    <text class="text-30 font-900">票据</text>
                </view>
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
                      @click="onGoPage({ name: 'order-create', params: { id: '1' } }, false)">
                    <text class="text-30 font-900">上车</text>
                    <text class="text-24">（$20.00）</text>
                </view>
            </template>
            <template v-else-if="status === 3">
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
                      @click="onGoPage({ name: 'order-create', params: { id: '1' } }, false)">
                    <text class="text-30 font-900">上车</text>
                    <text class="text-24">（$20.00）</text>
                </view>
            </template>
            <template v-else-if="status === 4">
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
                      @click="onGoPage({ name: 'order-user', params: { id: '1' } }, false)">
                    <text class="text-30 font-900">检票</text>
                </view>
            </template>
            <template v-else-if="status === 5">
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
                      @click="onGoPage({ name: 'order-success', params: { id: '1' } }, false)">
                    <text class="text-30 font-900">票据</text>
                </view>
            </template>
            <template v-else-if="status === 6">
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
                      @click="onGoPage({ name: 'post-create', params: { id: '1' } }, false)">
                    <text class="text-30 font-900">再发起</text>
                </view>
                <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
                      @click="onGoPage({ name: 'order-user', params: { id: '1' } }, false)">
                    <text class="text-30 font-900">检票</text>
                </view>
            </template>
        </view>
    </Layout>
</template>

<style scoped lang="scss">
@import '@/static/styles/common.scss';
</style>
