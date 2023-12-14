<script setup lang="ts">
import Layout from "@/components/layout/layout.vue";
import NavBar from "@/components/nav-bar/nav-bar.vue";
import UniIcons from "@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import {onLoad, onPageScroll} from "@dcloudio/uni-app";
import {computed, reactive, ref} from "vue";
import {onBack, onGoPage} from "@/utils/business";
import {toast} from "@/utils/uniapi/prompt";

const scrollTop = ref(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
  if (scrollTop.value > 80) {
    uni.setNavigationBarColor({
      frontColor: '#000000',//黑
      backgroundColor: '#000000',
    })
  } else {
    uni.setNavigationBarColor({
      frontColor: '#ffffff',//白
      backgroundColor: '#ffffff'
    })
  }
})

const postId = ref(0),
    currentData = reactive({})

onLoad(params => {
  if (params?.id) {
    postId.value = params?.id
    const _currentData = TestData.find(item => item.id == postId.value)
    if (!_currentData?.id) return toast("暂无该数据", {complete: () => setTimeout(onBack, 1500)})
    Object.assign(currentData, _currentData)
  }
})

const status = computed(() => {
  // 未开始
  if (currentData?.status == 'pending') {
    if (currentData?.isMe) {
      // 编辑、检票
      return 1
    } else if (currentData?.isJoin) {
      // 票据、上车
      return 2
    } else {
      // 上车
      return 3
    }
    // 进行中
  } else if (currentData?.status == 'processing') {
    if (currentData?.isMe) {
      // 检票
      return 4
    } else if (currentData?.isJoin) {
      // 票据
      return 5
    } else {
      // 只有分享
      return 0
    }
    // 已结束
  } else if (currentData?.status == 'solved') {
    if (currentData?.isMe) {
      // 检票、再发起
      return 6
    } else if (currentData?.isJoin) {
      // 票据
      return 4
    } else {
      // 只有分享
      return 0
    }
  }
  return 0
})

const TestData = [{
  id: 1,
  name: "1号活动",
  status: "processing",
  isJoin: true,
  isMe: true
}, {
  id: 2,
  name: "2号活动",
  status: "pending",
  isJoin: true,
  isMe: true
}, {
  id: 3,
  name: "3号活动",
  status: "pending",
  isJoin: true,
  isMe: false
}, {
  id: 4,
  name: "4号活动",
  status: "solved",
  isJoin: true,
  isMe: true
}]

</script>

<template>
  <Layout>
    <template #header>
      <NavBar :title="currentData?.name" :backgroundColor="scrollTop>=80 ? 'white':undefined"/>
    </template>
    <view class="m-40 mb-160">
      <view class="flex justify-between center mb-30">
        <view>
          <view class="text-40 font-900 ml-20">{{ currentData?.name }}</view>
          <view class="flex mt-20">
            <view class="capsule-button text-24 " :class="currentData?.status">{{
              currentData?.status == 'processing' ? '进行中' : currentData?.status == 'pending' ? '未开始' : '已结束'
              }}
            </view>
            <view class="capsule-button bg-primary-sec text-24 ml-20">活动时：2.29-3.29</view>
          </view>
        </view>
        <view class="w-170 h-170 b-rd-20 bg-amber mr-30">

        </view>
      </view>
      <view class="bg-white p-40 b-rd-50">
        <view class="mt-30">
          <view class="gc-item">活动时间：小鳄鱼1</view>
          <view class="gc-item">
            <!--            <uni-icons type="location-filled" size="20" color="#39393A"/>-->
            9.3km 江北石子山-北门
          </view>
        </view>

        <!--参与者列表，图像+名字，当前人数和剩余名额；点击可展开modal显示所有参与人员；-->
        <view class="mt-30">
          <view class="text-24 center justify-between">
            <text class="text-gray">12人一起</text>
            <text class="text-primary">仅剩5个名额</text>
          </view>
          <view class="user-lists mt-20 grid grid-cols-5">
            <view class="user center flex-col" v-for="i in 5">
              <view class="avatar w-100 h-100 mb-10">
                <image src="https://img.js.design/assets/img/641803bc0d016e025e84c54a.png"
                       class="h-full w-full b-rd-50"
                       mode="aspectFill"/>
              </view>
              <view class="user-name text-gray text-24 text-nowrap w-100">李老师李老师李老师李老师</view>
            </view>
          </view>
        </view>

        <!-- 活动描述 -->
        <view class="gc-title text-28 mt-40 mb-30">活动描述</view>
        <view class="text-26 font-400">
          1. 请在「艺术展览类活动」、「学习课程类活动」场景中二选一，设计活动报名小程序，需包含 4个必选命题 + 1 个可选「TDesign
          移动端组件库」 <br/>
          1. 基于新版「TDesign 移动端组件库」的框架进行合理的视觉演绎、丰富视觉细节，符合当下流行的 UI 界面风格； <br/>
          2. 对界面中组件的配色、形状、尺寸、质感都可以定制，注意满足 UI 规范的一致性即可。<br/>
          1. 单个页面的尺寸请以 375*812的比例进行输出，最终作品可自行排版展示； <br/>
          2. 必要的流程可以通过连线进行交互说明；点此查看 CoDesign 上传教程
        </view>
        <!-- 详情图片 -->
        <view class="gc-title text-28 mt-40 mb-30">详情图片</view>
        <view class="w-full">
          <image class="w-full" src="https://img.js.design/assets/img/64180b6230374b2d6ef4499d.png" v-for="i in 5"/>

        </view>
      </view>
    </view>
    <view class="flex center w-full justify-between bg-primary fixed bottom-0 p-40 pt-30 pb-50"
          style="box-sizing: border-box">
      <view class="center">
        <uni-icons type="redo-filled" size="22" class="mr-10"/>
        分享
      </view>

      <template v-if="status===1">
        <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
              @click="onGoPage({name: 'post-create', params: {id: '1'}}, false)">
          <text class="text-30 font-900">编辑</text>
        </view>
        <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
              @click="onGoPage({name: 'order-user', params: {id: '1'}}, false)">
          <text class="text-30 font-900">检票</text>
        </view>
      </template>
      <template v-else-if="status===2">
        <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
              @click="onGoPage({name: 'order-success', params: {id: '1'}}, false)">
          <text class="text-30 font-900">票据</text>
        </view>
        <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
              @click="onGoPage({name: 'order-create', params: {id: '1'}}, false)">
          <text class="text-30 font-900">上车</text>
          <text class="text-24">（$20.00）</text>
        </view>
      </template>
      <template v-else-if="status===3">
        <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
              @click="onGoPage({name: 'order-create', params: {id: '1'}}, false)">
          <text class="text-30 font-900">上车</text>
          <text class="text-24">（$20.00）</text>
        </view>
      </template>
      <template v-else-if="status===4">
        <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
              @click="onGoPage({name: 'order-user', params: {id: '1'}}, false)">
          <text class="text-30 font-900">检票</text>
        </view>
      </template>
      <template v-else-if="status===5">
        <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
              @click="onGoPage({name: 'order-success', params: {id: '1'}}, false)">
          <text class="text-30 font-900">票据</text>
        </view>
      </template>
      <template v-else-if="status===6">
        <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
              @click="onGoPage({name: 'post-create', params: {id: '1'}}, false)">
          <text class="text-30 font-900">再发起</text>
        </view>
        <view class="bg-black text-white b-rd-50 p-20 flex-1 ml-30 center"
              @click="onGoPage({name: 'order-user', params: {id: '1'}}, false)">
          <text class="text-30 font-900">检票</text>
        </view>
      </template>

      <!--      <view>-->
      <!--        <view class="bg-black text-white p-20 b-rd-50 pl-120 pr-120 center"-->
      <!--              @click="onGoPage({name: 'order-create', params: {id: '1'}}, false)">-->
      <!--          <text class="text-35 font-900">上车</text>-->
      <!--          <text class="text-28">（$20.00）</text>-->
      <!--        </view>-->
      <!--      </view>-->
    </view>

  </Layout>
</template>

<style scoped lang="scss">
@import "@/static/styles/common.scss";

</style>