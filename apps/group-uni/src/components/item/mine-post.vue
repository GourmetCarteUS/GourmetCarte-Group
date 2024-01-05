<script setup lang="ts">
import { startAtFormat } from 'group-uni/src/utils/utils';
import { EventDetailData } from 'group-common';
import { onGoPage } from '@/utils/business';
import logoUrl from '@/static/images/logo.png';

defineProps<{ data: EventDetailData }>();
</script>

<template>
    <view class="b-rd-20 p-20 mt-20" :class="'group-item'" @click="onGoPage({ name: 'post-detail', params: { id: data?.id } }, false)">
        <view class="flex justify-between">
            <view class="w-120 h-120 b-rd-20">
                <template v-if="data?.imageDescription?.length">
                    <image :src="data.imageDescription[0]" class="h-full w-full b-rd-20" mode="aspectFill" />
                </template>
                <image v-else :src="logoUrl" class="h-full w-full b-rd-20" mode="aspectFill" />
            </view>
            <view class="text-24 ml-20 flex-col flex flex-1 justify-center">
                <view class="mb-20">
                    <view class="flex justify-between">
                        <view class="text-30 font-900 text-nowrap flex-1">
                            {{ data?.title }}
                        </view>
                        <view>共{{ data?.joinCount }}人一起</view>
                    </view>
                    <view class="text-gray text-nowrap w-400">{{ data?.location }}</view>
                </view>
                <view class="flex">
                    <view class="capsule-button solved" v-if="data.status">已结束</view>
                    <view class="capsule-button pending" v-else>未开始</view>
                    <view class="capsule-button ml-20" :class="data.status ? 'solved' : 'bg-primary-sec'">
                        <uni-dateformat :date="data.startAt" format="yyyy/MM/dd" />
                    </view>
                    <view class="bg-primary rounded-full w-33 h-33 p-10 color-white text-center ml-20" v-if="!data?.isPublic">私</view>
                </view>
            </view>
        </view>
        <!--            <view class="flex">-->
        <!--              <view class="capsule-button bg-error text-white w-full text-center">下车 (5票)</view>-->
        <!--              <view class="capsule-button bg-warning text-white w-full ml-20 text-center">验票 (5票)</view>-->
        <!--            </view>-->
    </view>
</template>

<style scoped lang="scss">
@import '@/static/styles/common.scss';

.group-item {
    //background: linear-gradient(180deg, rgba($uni-color-primary, 0.2) 0%, rgba(243, 250, 231, 0) 100%);
    background: rgba($uni-color-primary, 0.1);
    //border: 1px solid #7f7eff20;
}

.group-item-privacy {
    @extend .group-item;
    position: relative;
    overflow: hidden;

    &:after {
        content: 'Private';
        background: black;
        position: absolute;
        color: white;
        right: 0;
        top: 0;
        font-size: 24rpx;
        padding: 5rpx 15rpx;
    }
}
</style>
