<script setup lang="ts">
import {getUrlParams, onGoPage} from "@/utils/business";
import {computed, ref} from "vue";
import {onLoad} from "@dcloudio/uni-app";
import CincoreIcon from "@/components/cincore-icon/index.vue";
import {useUserInfoStore} from "@/state/modules/user-info";
import {view_shop_all} from "@/api/shop/shop";
import local from "@/static/local.png"
import Franchise from "@/static/franchise.png"
import sign from "@/static/sign.png"
import {toast} from "@/utils/uniapi/prompt";

const location = computed<any>(() => {
  const location = useUserInfoStore().location
  if (location) getShopAll(location)
  return location
})
const covers = ref<any[]>([])

async function getShopAll(_location: any) {
  console.log(_location)
  covers.value = [{
    id: 0,
    latitude: _location.latitude,
    longitude: _location.longitude,
    width: 23,
    height: 36,
    joinCluster: true,
    iconPath: local
    // callout: {
    //   content: '我的位置',
    //   color: '#BCA474',
    //   bgColor: '#fff',
    //   borderRadius: 10,
    //   textAlign: 'center',
    //   padding: 5,
    //   fontSize: '30rpx',
    //   display: 'ALWAYS'
    // }
  }]
  const res = await view_shop_all()
  res.data.data.data.map(item => {
    covers.value.push({
      id: item.id,
      latitude: item.latitude,
      longitude: item.longitude,
      width: 35.5,
      height: 46,
      iconPath: sign,
      // callout: {
      //   content: item.name,
      //   color: '#BCA474',
      //   bgColor: '#fff',
      //   borderRadius: 10,
      //   textAlign: 'center',
      //   padding: 5,
      //   fontSize: '30rpx',
      //   display: 'ALWAYS'
      // }
    })
  })
}

function onMarker(e: { detail: any; }) {
  const markerId = e.detail?.markerId
  console.log("markerId", markerId)
  if (markerId) {
    onGoPage({name: "store-detail", params: {id: markerId}}, false)
  }
}

function openScanCode() {

  uni.scanCode({
    success: function (res) {
      if (res.result) {
        const id = getUrlParams(res.result, "id")
        if (id) onGoPage({name: "room", params: {id}}, true);
        else toast("扫码失败")
      }
    },
    fail: function (result) {
      toast("扫码失败")
      console.log(result)
    }
  });
}

onLoad(() => {
  useUserInfoStore().getLocation()
})
</script>

<template>
  <view class="bg-white b-rd-20 m-20 mb-0">
    <view class="h-400 mb-20 overflow-hidden" style="border-radius: 20rpx 20rpx 0 0">
      <map class="map h-full w-full position-relative" :latitude="location?.latitude" :longitude="location?.longitude"
           :markers="covers"
           @markertap="onMarker" @callouttap="onMarker">
<!--        <image class="w-60 h-60 position-absolute right-10 bottom-120" :src="local"/>-->
<!--        <image class="w-full h-110 position-absolute bottom-0" :src="Franchise" style="border-radius: 20rpx 20rpx 0 0"-->
<!--               @click="onGoPage({name: 'investment'})"/>-->
      </map>
    </view>
    <view class="flex flex-justify-around text-28 pb-20 ">
      <view class="center flex-col" @click="onGoPage({name: 'store'}, false)">
        <CincoreIcon styles="center mb-10" size="28px" type="dianpu"/>
        <view>附近站点</view>
      </view>
      <view class="center flex-col" @click="onGoPage({name: 'mine'})">
        <CincoreIcon styles="center mb-10" size="28px" type="wode"/>
        <view>个人中心</view>
      </view>
      <view class="center flex-col" @click="onGoPage({name: 'use-help'})">
        <CincoreIcon styles="center mb-10" size="28px" type="yiwen"/>
        <view>使用帮助</view>
      </view>
      <button open-type="contact" class="view-btn center flex-col">
        <CincoreIcon styles="center mb-10" size="28px" type="kefu"/>
        <view>联系客服</view>
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import "@/static/styles/common.scss";
</style>