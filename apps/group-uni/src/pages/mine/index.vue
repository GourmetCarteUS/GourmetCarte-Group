<script setup lang="ts">
import {computed, ref} from "vue";
import Layout from "@/components/layout/layout.vue";
import CincoreIcon from "@/components/cincore-icon/index.vue";
import {onGoPage} from "@/utils/business";
import {useUserInfoStore} from "@/state/modules/user-info";
import type {UserInfo} from '@/api/user-info/user-info.types'
import {router} from "@/router";
import Settings from "@/pages/mine/settings.vue";
import {view_order_list} from "@/api/order/order";

const userInfo = computed<UserInfo | null>(() => useUserInfoStore().user)
const dataList = ref([]), pagingRef = ref(),
    settingUserRef = ref(),
    orderTotal = ref(0)

async function queryList(pageNo: number, pageSize: number) {
  const {data} = await view_order_list({
    status: 'run',
    page: pageNo,
    limit: pageSize
  })
  orderTotal.value = data.data.total
  pagingRef.value.complete(data.data.data);
}

function onSetting() {
  if (!userInfo.value) return router.push({name: "login"});
  settingUserRef.value.handleOpen();
}
</script>

<template>
  <Layout bg-color="#f5f5f5">
    <z-paging ref="pagingRef" @query="queryList" v-model="dataList" use-virtual-list use-compatibility-mode
              :extra-data="{id:'mine', total: orderTotal}" empty-view-text="还没有进行中的订单哦！"
              use-safe-area-placeholder safe-area-inset-bottom>
      <template #header>
        <view class="relative">
          <view class="bg-primary header" @click="onSetting">
            <view class="flex text-white flex-items-center">
              <image class="w-140 h-140 b-rd-120"
                     :src="userInfo?.avatar || '/static/avatar.png'"/>
              <view class="ml-30">
                <view class="text-40 font-medium">{{ userInfo?.name || "未登录" }}</view>
                <view class="text-28" v-if="userInfo?.id">
                  No.{{ userInfo?.id }}
                </view>
              </view>
            </view>
          </view>
          <view class="bg-white grid grid-cols-2 p-20 text-24 text-gray pt-60">
            <view class="center flex-col balance">
              我的余额
              <text class="text-primary text-32 mt-15 font-medium">￥{{ userInfo?.balance || 0 }}</text>
            </view>
            <view class="center flex-col">
              已下单
              <text class="text-primary text-32 mt-15 font-medium">{{ userInfo?.addNum || 0 }}次</text>
            </view>
          </view>
          <view class="absolute bottom-140 w-full center">
<!--            flex-justify-between-->
            <view class="flex text-24 bg-white tab flex-justify-around b-rd-10">
              <view @click="onGoPage({name: 'order'})">
                <CincoreIcon size="26px" class="center mb-10" type="order"/>
                <view>充电记录</view>
              </view>
              <view @click="onGoPage({name: 'order'})">
                <CincoreIcon size="26px" class="center mb-10" type="order"/>
                <view>站点收藏</view>
              </view>
              <view @click="onGoPage({name: 'balance'})" class="hidden">
                <CincoreIcon size="26px" class="center mb-10" type="balance"/>
                <view>余额充值</view>
              </view>
              <view @click="onGoPage({name: 'use-help'})">
                <CincoreIcon size="26px" class="center mb-10" type="yiwen"/>
                <view>使用帮助</view>
              </view>
              <button open-type="contact" class="view-btn">
                <CincoreIcon size="26px" class="center mb-10" type="kefu"/>
                <view>联系客服</view>
              </button>
            </view>
          </view>
        </view>
      </template>
    </z-paging>
  </Layout>

  <Settings ref="settingUserRef"/>
</template>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

.header {
  background: $uni-color-primary url("@/static/logo.png") no-repeat 120%/45%;
  padding: 50rpx 0 130rpx 60rpx;
}

.balance {
  border-right: 1px dashed #C7C7C7;
}

.tab {
  width: calc(100% - 100px);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.3);
  padding: 15rpx 50rpx 10rpx;
}
</style>