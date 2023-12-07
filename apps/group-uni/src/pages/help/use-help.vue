<template>
  <Layout bg-color="#f5f5f5">
    <uni-collapse>
      <uni-collapse-item title="房间不开门、不通电或中途断电怎么办？">
        <view class="content p-20 text-gray text-25">
            如遇见此情况，您可前往您的个人中心，找到进行中的订单，点击开门/上电即可。如仍无法解决,您可
          <button open-type="contact" class="text-btn text-primary">联系客服</button>进行处理。
        </view>
      </uni-collapse-item>
      <uni-collapse-item title="房间到时没出门怎么办?">
        <view class="content p-20">
          <text class="text-gray text-25">房间到时后如出现门锁关闭，您轻按门旁的白色出门按钮，即可打开房门。</text>
        </view>
      </uni-collapse-item>
      <uni-collapse-item title="房间如何续费？">
        <view class="content p-20">
          <text class="text-gray text-25">如需续费，您可点击首页底部“房间续费”按钮，或进入个人中心，找到进行中的订单，点击立即续费即可。
            温馨提示：预定时间结束前10分钟广播会通知您及时续费，如到时未及时续费，您的房间可能会被其他用户预定。
          </text>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </Layout>
</template>
<script setup lang="ts">
import Layout from "@/components/layout/layout.vue";
</script>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

</style>