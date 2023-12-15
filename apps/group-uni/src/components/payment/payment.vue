<script setup lang="ts">
import { computed } from 'vue';
import { useUserInfoStore } from '@/state/modules/user-info';
import type { UserInfo } from '@/api/user-info/user-info.types';
import CincoreIcon from '@/components/cincore-icon/index.vue';

const userInfo = computed<UserInfo | null>(() => useUserInfoStore().user);

function radioChange(evt: any) {
    console.log(evt.detail.value);
    emits('update:payType', evt.detail.value);
}

const emits = defineEmits(['update:payType']);
defineProps<{
    isBalance: Boolean;
}>();
</script>

<template>
    <radio-group @change="radioChange">
        <label class="flex flex-justify-between flex-items-center">
            <view class="center mt-10">
                <CincoreIcon styles="mr-10" size="28px" type="wx-pay" />
                微信支付
            </view>
            <radio value="1" checked style="transform: scale(0.8)" />
        </label>
        <label class="flex flex-justify-between flex-items-center" v-if="isBalance">
            <view class="center mt-10">
                <CincoreIcon styles="mr-10" size="28px" type="yuezhifu" />
                余额支付
                <text class="text-primary text-24">（可用余额：￥{{ userInfo?.balance || 0 }}）</text>
            </view>
            <radio value="2" style="transform: scale(0.8)" />
        </label>
        <view class="text-gray text-24 mt-20"> 特别提醒：余额支付和其他支付方式不可同时使用。 </view>
    </radio-group>
</template>

<style scoped lang="scss">
@import '@/static/styles/common.scss';
</style>
