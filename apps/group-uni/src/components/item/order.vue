<template>
  <view class="list-item" @click="handleClick">
    <view class="header flex flex-col w-full">
      <view class="flex flex-justify-between">
        <view class="flex center">
          订单编号：
          <text class="text-black">{{ item?.orderSn?.toUpperCase() }}</text>
          <button v-if="item?.orderSn" @click.stop="setClipboardData(item.orderSn.toString())">复制</button>
        </view>
        <view v-if="item?.status===0">待支付</view>
        <view v-else-if="item?.status===100">已支付</view>
        <view v-else-if="item?.status===200" class="text-green-6">进行中</view>
        <view v-else-if="item?.status===300">已完成</view>
        <view v-else-if="item?.status===400">售后中</view>
        <view v-else-if="item?.status===500">退款中</view>
        <view v-else-if="item?.status===600" class="text-primary">已结束</view>
        <view v-else-if="item?.status===610" class="text-gray">已退款</view>
        <view v-else-if="item?.status===620">已取消</view>
      </view>
      <view class="time flex flex-justify-between">
        <view class="mt-10">{{ item?.createdAt }}</view>
        <view v-if="item?.isRefund" class="bg-primary text-white pb-6 b-rd-4 pl-15 pr-15 mt-10"
              @click.stop="handelOpen">售后申请
        </view>
      </view>
    </view>
    <view class="w-full flex text-24">
      <image mode="aspectFill" class="w-150 h-180 b-rd-10" :src="item?.roomPicture"/>

      <view class="flex flex-col ml-20 justify-between w-full">
        <view>
          <text class="text-28">{{ item?.roomName }}</text>
          <view class="text-20 text-gray">{{ item?.shopName }}</view>
        </view>

        <view class="w-full  text-end">
          <text class="text-gray text-24 mr-20">总价￥{{ item?.amount }}</text>
          实付￥
          <text class="text-32">{{ item?.actualAmount }}</text>
        </view>
      </view>
    </view>
  </view>

  <RefundDialog ref="RefundDialogRef"/>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {setClipboardData} from "@/utils/uniapi";
import {onGoPage} from "@/utils/business";
import RefundDialog from "@/components/dialog/refund.vue";
import {OrderDetailModel} from 'cincore-common'

const props = defineProps<{
  isClick?: boolean,
  item: OrderDetailModel
}>()

const RefundDialogRef = ref<InstanceType<typeof RefundDialog> | null>(null);

function handelOpen() {
  RefundDialogRef.value?.onOpen(props.item.id, props.item.actualAmount);
}

function handleClick() {
  if (props?.isClick) onGoPage({name: 'order-detail', params: {id: props.item.id.toString()}})
}

</script>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

.list-item {
  border-radius: 30rpx;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 10rpx 30rpx 20rpx;
  height: 300rpx;
  margin: 20rpx;


  .header {
    font-size: 24rpx;
    color: #A3A3A3;
    font-weight: 500;
    border-bottom: 1rpx dashed #c7c7c7;
    padding-bottom: 14rpx;

    button {
      font-size: 24rpx;
      color: #A3A3A3;
      background-color: #EBEBF2;
      line-height: normal;
      padding: 5rpx 20rpx;
      margin: 0 0 0 20rpx;

      &:after {
        border: 1px solid transparent !important;
      }
    }
  }
}
</style>