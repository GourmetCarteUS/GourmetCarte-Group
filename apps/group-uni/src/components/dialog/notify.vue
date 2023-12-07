<script setup lang="ts">
import {ref} from "vue";
import {onBack, onGoPage} from "@/utils/business";
import CincoreIcon from "@/components/cincore-icon/index.vue";

const emits = defineEmits(["createOrder"])


const popupRef = ref(),
    dialogCode = ref<number>(1)

async function handleClose() {
  popupRef?.value.close()
}

function handleOpen(code: number) {
  dialogCode.value = code
  popupRef?.value.open()
}

/**
 * 订阅
 * @constructor
 */
function Subscribe() {
  // TODO https://blog.csdn.net/qq_44718932/article/details/126130702
  uni.requestSubscribeMessage({
    tmplIds: ['LN2YR_63r04Klqhf_ryYjNuqJ_Qk9WPWqzT0c1BQMY4'],
    success(res) {
      console.log(res)
    }
  })
}

async function handleConfirm() {
  const newUser = uni.getStorageSync("newUser")
  if (!newUser) {
    uni.setStorageSync("newUser", true);
    dialogCode.value = 3
  }
  emits('createOrder')
  handleClose()
}

defineExpose({
  handleOpen
})
</script>

<template>
  <uni-popup ref="popupRef" type="center">
    <view class="bg-white b-rd-20 w-600">
      <view class="center header">
        <CincoreIcon size="26px" styles="center mb-10" type="yiwen"/>
        <text class="text-28 text-primary">
          <template v-if="[1,2,4].includes(dialogCode)">
            温馨提示
          </template>
          <template v-else>
            预订提示
          </template>
        </text>
      </view>

      <view class="p-40 pb-20 text-26 body">
        <view v-if="dialogCode===1">
          该房间正在维护中，暂时不可预定，建议您更换其他房间看看。为您带来的不便，我们深表歉意！
        </view>
        <view v-if="dialogCode===2">该房间有用户正在使用。您可订阅到时通知。我们将在本房间可预订时，通过微信“服务通知”告知您！
          <text class="gray">该通知为一次性服务，不会给您带来困扰，请放心订阅。</text>
        </view>

        <view v-if="dialogCode===3">
          下单后不可取消订单，不可申请退款。 提前结束也无法申请退款。 <br>
          <text class="gray">预订保洁中的房间，下单后5分钟内可退款，超过5分钟后无法退款。</text>
        </view>

        <view v-if="dialogCode===4">
          您正在预订
          <text class="text-primary">尚未打扫</text>
          的房间，如您不介意仍可继续下单。下单后如果对环境不满意，
          <text class="text-primary">您可在5分钟内申请退款</text>
          。为您带来的不便，我们深表歉意！
        </view>

        <view v-if="dialogCode===5">
          该房间有用户正在预订，但还未支付成功。您可在
          <text class="text-primary">1分钟后</text>
          再次尝试预订此房间。
        </view>

      </view>

      <view class="center footer">
        <template v-if="[1, 5].includes(dialogCode)">
          <button @click="handleClose">我知道了</button>
        </template>
        <template v-else-if="dialogCode===2">
          <button @click="Subscribe">订阅通知</button>
          <button @click="onBack">换个房间</button>
        </template>
        <template v-else-if="dialogCode===3">
          <button @click="emits('createOrder');handleClose()">同意</button>
          <button @click="handleClose">不同意</button>
        </template>
        <template v-else>
          <button @click="handleConfirm">继续预订</button>
          <button @click="onBack">换个房间</button>
        </template>
      </view>
    </view>
  </uni-popup>
</template>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

.primary-btn {
  background-color: white;
  color: $uni-color-primary;
  border: 1px solid $uni-color-primary;
}

.header {
  border-bottom: 1px dashed $uni-color-primary;
  height: 70rpx;
}

.body {
  color: #1E1B16;
  line-height: 2
}

.footer {
  height: 80rpx;

  button {
    margin: 0;
    line-height: normal;
    border-radius: 60rpx;
    padding: 8rpx 16rpx;
    font-size: 24rpx;
    @extend .text-primary;
    background-color: white;
    border: 1rpx solid $uni-color-primary;
    &:after{
      border: none;
    }

    &:first-child {
      @extend .bg-primary;
      color: white;
      margin-right: 40rpx;
    }
  }
}

</style>