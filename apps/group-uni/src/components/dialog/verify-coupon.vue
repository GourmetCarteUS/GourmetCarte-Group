<script setup lang="ts">
import { reactive, ref } from 'vue';
import { toast } from '@/utils/uniapi/prompt';
import { view_check_coupon } from '@/api/shop/shop';
import CincoreIcon from '@/components/cincore-icon/index.vue';

const popupRef = ref(),
    couponData = reactive<{
        title?: string;
        duration?: number;
        price?: number;
        quanCode?: string;
        payType: number;
    }>({
        payType: 5,
    }),
    couponForm = reactive({
        roomId: '',
        payIdentifying: '',
    });

const emits = defineEmits(['update:duration']);

function handleOpen(roomId: string) {
    couponForm.roomId = roomId;
    popupRef.value?.open();
}

async function handleConfirm() {
    try {
        const { data } = await view_check_coupon(couponForm);
        if (data.code) return toast(data?.msg);
        couponData.title = `团购${data.data.actualAmount}元抵扣${data.data.amount}元券`;
        couponData.price = data.data.amount;
        couponData.duration = data.data.duration;
        couponData.quanCode = data.data.quanCode;
        emits('update:duration', data.data.duration);
    } catch (error) {
        toast('验券失败，请联系客服');
    }
    popupRef.value?.close();
}

function iconClick() {
    uni.scanCode({
        success: function (res) {
            if (res.result) {
                couponForm.payIdentifying = res.result;
            }
        },
        fail: function (result) {
            toast('扫码失败');
            console.log(result);
        },
    });
}

defineExpose({ handleOpen, couponData });
</script>

<template>
    <uni-popup ref="popupRef" type="bottom" background-color="#fff">
        <view class="p-20">
            <view class="center relative text-34">
                团购券验券
                <CincoreIcon styles="absolute right-0" size="32px" type="guanbi" @click="popupRef?.close" />
            </view>

            <view class="center flex-col mt-40">
                <view class="flex mb-30" style="transform: scale(0.5)">
                    <view class="b-rd-80 overflow-hidden" style="transform: translateX(20rpx)">
                        <CincoreIcon size="60px" type="meituan" />
                    </view>
                    <view class="b-rd-80 overflow-hidden" style="transform: translateX(-20rpx)">
                        <CincoreIcon size="60px" type="shejiaotubiao-43" />
                    </view>
                </view>

                <view class="w-500">
                    <view class="scan-input mb-28">
                        <uni-easyinput
                            suffixIcon="scan"
                            v-model="couponForm.payIdentifying"
                            placeholder="输入卡券兑换码"
                            placeholderStyle="font-size:16px"
                            trim="all"
                            @iconClick="iconClick"
                            :inputBorder="false"
                        />
                    </view>
                    <button class="bg-primary text-white w-full" size="mini" @click="handleConfirm">立即兑换</button>
                </view>
            </view>

            <view class="text-gray text-24 mt-48">
                1.团购券仅在支持的门店使用，兑换前查看门店是否支持兑换团购券。<br />
                2.请注意团购券有效期，过期的团购券无法兑换成功；团购券到期未使用会自动退款。<br />
                3.团购券一经使用无法退还，如遇特殊情况可联系客服处理。
            </view>
        </view>
    </uni-popup>
</template>

<style scoped lang="scss">
@import '@/static/styles/common.scss';

.scan-input {
    border-bottom: 1px dashed #c7c7c7;
}
</style>
