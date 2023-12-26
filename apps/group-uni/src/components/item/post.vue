<template>
    <view class="post-container m-20 mb-0 bg-white"
          @click="onGoPage({ name: 'post-detail', params: { id: data?.id } }, false)">
        <image src="https://img.js.design/assets/img/641803bc0d016e025e84c54a.png" class="max-h-400 w-full"
               mode="widthFix"/>
        <view class="p-20">
            <view class="flex justify-between center">
                <text class="font-500 flex-1 mr-10 text-nowrap">{{ data?.title }}</text>
                <text class="text-24 text-gray">{{
                        data?.joinCount > 0 ? `${data?.joinCount}人一起` : `${data?.viewCount || 5}人想去`
                    }}
                </text>
            </view>
            <view class="flex justify-between mt-20">
                <view class="flex items-center">
                    <view class="capsule-button text-24 bg-primary-sub mr-20">{{ data?.status ? '已结束' : '未开始' }}
                    </view>
                    <view class="capsule-button text-24 bg-primary-sec mr-20">
                        {{ startAtFormat(data?.startAt) }}
                    </view>
                </view>
                <view class="capsule-button text-28 bg-black text-white">上车</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import {onGoPage} from '@/utils/business';
import {EventDetailData} from 'group-common';
import {startAtFormat} from '@/utils/utils'

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
