<template>
    <Layout bg-color="#f5f5f5">
        <view class="bg-white p-20 text-28">
            <view class="dashed pb-20">
                如需咨询加盟，您可点击
                <button open-type="contact" class="text-btn text-primary">联系客服</button>
                进行咨询，或通过下列方式联系：
            </view>

            <view class="mt-20 p-20">
                <view class="flex flex-content-between">
                    <view class="w-120 h-120 mr-20">
                        <image src="http://mfapi.cincore.cn/upload/2023101111422471712.png" class="w-full h-full" />
                    </view>
                    <view class="mt-10">
                        <view class="text-32 mb-10">江经理</view>
                        <view class="text-25 text-gray-7" @click="callPhone">
                            电话：
                            <text class="text-primary">17774916211</text>
                        </view>
                    </view>
                </view>
                <view class="center flex-col mt-20">
                    <view class="w-460 h-460">
                        <image src="http://mfapi.cincore.cn/upload/2023101111420044026.png" class="w-full h-full" show-menu-by-longpress />
                    </view>
                    <view class="text-24 text-gray-3 mt-20">扫一扫上面的二维码图案，加我为好友</view>
                    <view class="text-24 text-gray-3 mt-20">长按识别二维码</view>
                </view>
            </view>
        </view>
    </Layout>
</template>
<script setup lang="ts">
import Layout from '@/components/layout/layout.vue';

function callPhone() {
    uni.makePhoneCall({
        phoneNumber: '17774916211',
    });
}
</script>

<style scoped lang="scss">
@import '@/static/styles/common.scss';
</style>
