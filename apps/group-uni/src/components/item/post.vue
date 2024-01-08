<template>
    <view class="post-container m-20 mb-0 bg-white" @click="onGoPage({ name: 'post-detail', params: { id: data?.id } }, false)">
        <template v-if="data?.imageDescription?.length">
            <image :src="data.imageDescription[0]" class="max-h-400 w-full" mode="aspectFill" />
        </template>
        <image v-else :src="logoUrl" class="max-h-400 w-full" mode="aspectFill" />
        <view class="p-20">
            <view class="flex justify-between center">
                <text class="font-500 flex-1 mr-10 text-nowrap">{{ data?.title }}</text>
                <text class="text-24 text-gray">{{ data?.joinCount > 0 ? `${data?.joinCount}人一起` : `${data?.viewCount || 5}人想去` }} </text>
            </view>
            <view class="flex justify-between mt-20">
                <view class="flex items-center">
                    <view class="capsule-button text-24 pending mr-20">未开始 </view>
                    <view class="capsule-button text-24 bg-primary-sec mr-20">
                        <uni-dateformat :date="data.startAt" format="yyyy/MM/dd" />
                    </view>
                </view>
                <view class="capsule-button text-28 bg-black text-white">{{ data.isJoin ? '下车' : '上车' }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onGoPage } from '@/utils/business';
import { EventDetailData } from 'group-common';
import { startAtFormat } from '@/utils/utils';
import logoUrl from '@/static/images/logo.png';

defineProps<{ data: EventDetailData }>();
</script>

<style scoped lang="scss">
@import '@/static/styles/common.scss';

.post-container {
    border: 1px solid rgba(235, 236, 237, 1);
    border-radius: 20rpx;
    overflow: hidden;
}
</style>
