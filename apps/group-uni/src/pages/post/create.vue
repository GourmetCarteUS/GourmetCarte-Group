<template>
    <Layout>
        <template #header>
            <NavBar title="创建活动" :backgroundColor="scrollTop >= 80 ? 'white' : undefined" />
        </template>
        <view class="bg-white m-40 p-40 b-rd-50 pb-800">
            <view class="gc-title text-28 font-900 mb-30">发布新活动</view>
            <view class="mt-20">
                <view class="gc-item-before">
                    <view>活动名称</view>
                    <view class="ml-20"><input type="text" placeholder="请输入活动名称" /></view>
                </view>
                <view class="gc-item-before">
                    <view>活动地址</view>
                    <view class="ml-20">请输入选择活动地址</view>
                </view>
                <view class="gc-item-before">
                    <view>活动时间</view>
                    <view class="ml-20">
                        <uni-datetime-picker :border="false" v-model="formData.startTime">
                            {{ formData.startTime || '请选择活动开始时间' }}
                        </uni-datetime-picker>
                    </view>
                </view>
                <view class="gc-item-before justify-between pr-20">
                    <view>活动人数</view>
                    <view class="ml-20">
                        <uni-number-box :min="2" v-model="formData.peopleNum" />
                    </view>
                </view>
                <view class="gc-item-before justify-between pr-20" style="overflow: initial">
                    <view>活动类型</view>
                    <view class="ml-20 w-full">
                        <uni-data-select v-model="formData.categoryId" :localdata="categoryList" />
                    </view>
                </view>
            </view>

            <view class="gc-title text-28 font-900 mb-30 mt-40">活动介绍</view>
            <view class="m-10">
                <uni-easyinput type="textarea" autoHeight placeholder="请输入内容" />
            </view>

            <view class="gc-title text-28 font-900 mb-20 mt-40">活动图片</view>
            <view class="m-20">
                <uni-file-picker limit="9" title="最多选择9张图片" />
            </view>
        </view>

        <view class="flex center w-full justify-between bg-primary fixed bottom-0 p-40 pt-30 pb-50" style="box-sizing: border-box">
            <view class="flex-1">
                <label class="center">
                    <checkbox value="cb" checked="true" />
                    <view class="text-24"> 已阅读《即时设计须知》并知悉参与活动的要求请在规定时间内上传~ </view>
                </label>
            </view>
            <view class="bg-black text-white p-20 b-rd-50 pl-60 pr-60">
                <text class="text-32">提交</text>
            </view>
        </view>
    </Layout>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import Layout from '@/components/layout/layout.vue';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import { onPageScroll } from '@dcloudio/uni-app';

const categoryList = [
    { value: 0, text: '户外' },
    { value: 1, text: '室内' },
    { value: 2, text: '美食' },
];

const formData = reactive({
    categoryId: undefined,
    peopleNum: 2,
    startTime: undefined,
});

const scrollTop = ref(0);
onPageScroll((e) => {
    scrollTop.value = e.scrollTop;
    if (scrollTop.value > 80) {
        uni.setNavigationBarColor({
            frontColor: '#000000', //黑
            backgroundColor: '#000000',
        });
    } else {
        uni.setNavigationBarColor({
            frontColor: '#ffffff', //白
            backgroundColor: '#ffffff',
        });
    }
});
</script>
<style scoped lang="scss">
@import '@/static/styles/common.scss';

:deep {
    .uni-select {
        border: 0;
    }
}
</style>
