<script setup lang="ts">
import { ref, reactive } from 'vue';
import { toast } from '@/utils/uniapi/prompt';
import { view_order_refund } from '@/api/order/order';

const RefundDialogRef = ref(),
    isSuccess = ref(true),
    refundForm = reactive({
        id: '',
        type: 1,
        description: '',
        amount: '',
    });

function onOpen(id: string, amount: string) {
    RefundDialogRef.value?.open();
    refundForm.id = id;
    refundForm.amount = amount;
}

function radioChange(event: any) {
    refundForm.type = Number(event.detail?.value);
}

async function onConfirm() {
    if (refundForm.type == 2 && !refundForm.description) {
        return toast('请填写退款原因');
    }
    const reason = ['房间卫生差', refundForm.description][refundForm.type - 1];
    const { data } = await view_order_refund({
        id: refundForm.id,
        reason: reason,
        amount: refundForm.amount,
    });
    if (data.code) {
        return toast(data.msg);
    } else {
        isSuccess.value = false;
    }
}

defineExpose({ onOpen });
</script>

<template>
    <uni-popup ref="RefundDialogRef" background-color="#fff" type="bottom">
        <view class="popup-content p-40">
            <view class="header flex text-center items-center align-center">
                <text class="text-36">退款申请</text>
                <uni-icons type="closeempty" size="30" class="icons" @click="RefundDialogRef?.close"></uni-icons>
            </view>

            <view class="content" v-if="isSuccess">
                <view>
                    <text>退款金额</text>
                    <text>¥{{ refundForm?.amount }}</text>
                </view>
                <view>
                    <text class="text-23 text-gray">温馨提示：如您使用了团购券，团购券会以余额的方式退回您的账户。</text>
                </view>
                <radio-group @change="radioChange">
                    <label class="radio text-24"
                        >房间卫生差
                        <radio value="1" color="#FBDA41" checked />
                    </label>
                    <label class="radio text-24"
                        >其他原因
                        <radio value="2" color="#FBDA41" />
                    </label>
                </radio-group>
                <textarea placeholder="请填写退款原因" class="text-24 mb-20" v-show="refundForm.type == 2" v-model="refundForm.description" />
                <button @click="onConfirm" class="text-white">确认</button>
            </view>

            <view class="success flex items-center flex-col" v-else>
                <view class="w-200 h-200 bg-green b-rd-50px flex items-center justify-center mb-20">
                    <uni-icons type="checkmarkempty" size="70" color="#fff"></uni-icons>
                </view>
                <view class="text-34 mb-20"> 申请退款成功！ </view>
                <view class="text-24 gray">
                    我们将尽快为您处理，如有任何疑问可
                    <text class="text-red">联系客服</text>
                    处理
                </view>
            </view>
        </view>
    </uni-popup>
</template>

<style scoped lang="scss">
.popup-content {
    .icons {
        position: absolute;
        right: 50rpx;
    }

    .header {
        margin-bottom: 50rpx;
    }

    .content {
        view {
            &:first-child {
                border-bottom: 1px solid #f7f7f7;
                padding-bottom: 20rpx;
            }
        }

        > view,
        label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 28rpx;
            margin-bottom: 20rpx;
        }

        radio {
            transform: scale(0.8);
        }

        textarea {
            border: 1px solid rgba(#938c7a, 0.6);
            width: 100%;
            padding: 10rpx;
            font-size: 30rpx;
        }

        button {
            background: $uni-color-primary;
            border-radius: 44px;
            width: 100%;
            font-size: 32rpx;
        }
    }
}
</style>
