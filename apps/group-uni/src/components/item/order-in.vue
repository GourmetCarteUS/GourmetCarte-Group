<template>
    <view class="m-20">
        <Card styles="p-10">
            <template #title>
                <view class="text-24 center">
                    进行中的订单
                    <text class="text-primary text-20">（{{ total || 0 }}/{{ index + 1 }}）</text>
                </view>
            </template>
            <template #sub-title>
                <view class="text-20 text-gray center" v-if="item?.isRefund">
                    保洁中的订单，下单5分钟内可退款，
                    <text class="text-primary">申请退款</text>
                </view>
            </template>
            <template #body>
                <view class="flex mt-30 center">
                    <view>
                        <image :src="item?.roomPicture" class="w-160 h-200" />
                    </view>

                    <view class="ml-20 text-gray text-24 mr-30">
                        <view class="text-28 font-medium text-black mb-10 flex">
                            <text>{{ item?.roomName }}</text>
                            <view class="text-primary flex center ml-10" @click="view_order_open(item.id)">
                                <CincoreIcon size="24px" styles="center mr-10" type="open-door" />
                                开门/上电
                            </view>
                        </view>
                        <view class="mb-10 flex">
                            <text>{{ item?.shopName }}</text>
                        </view>
                        <view class="mb-10 white-nowrap">开始：{{ item?.startTime }}</view>
                        <view class="mb-10 white-nowrap">结束：{{ item?.endTime }}</view>
                    </view>

                    <view class="text-24 pl-10 bl center flex-col">
                        <view class="text-gray mb-20">距离结束</view>
                        <uni-countdown :show-day="false" :second="countdown" splitorColor="#DB5549" color="#DB5549" />
                        <view
                            class="bg-primary mt-10 p-8 pl-15 pr-15 text-white center b-rd-30 text-24"
                            @click="onGoPage({ name: 'room', params: { id: item.roomId, continuation: '1' } })"
                            >立即续费
                        </view>
                    </view>
                </view>
            </template>
        </Card>
    </view>
</template>

<style scoped lang="scss">
@import '@/static/styles/common.scss';

.bl {
    border-left: 1px dashed #c7c7c7;
}
</style>
<script setup lang="ts">
import Card from '@/components/card/card.vue';
import { OrderDetailModel } from 'cincore-common';
import dayjs from 'dayjs';
import { computed } from 'vue';
import { onGoPage } from '@/utils/business';
import { view_order_open } from '@/api/order/order';
import CincoreIcon from '@/components/cincore-icon/index.vue';

const props = defineProps<{
    item: OrderDetailModel;
    index: number;
    total?: number;
}>();

const countdown = computed(() => {
    const second = dayjs().diff(props.item.endTime, 'second');
    return second <= 0 ? Math.abs(second) : 0;
});
</script>
