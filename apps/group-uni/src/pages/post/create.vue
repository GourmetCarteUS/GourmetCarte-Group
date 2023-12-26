<template>
    <Layout>
        <template #header>
            <NavBar title="创建活动" :backgroundColor="scrollTop >= 80 ? 'white' : undefined"/>
        </template>
        <view class="bg-white m-40 p-40 b-rd-50 pb-800">
            <view class="gc-title text-28 font-900 mb-30">发布新活动</view>
            <view class="mt-20">
                <view class="gc-item-before">
                    <view>活动名称</view>
                    <view class="ml-20"><input type="text" v-model="formData.title" placeholder="请输入活动名称"/>
                    </view>
                </view>
                <view class="gc-item-before">
                    <view>举办城市</view>
                    <view class="ml-20">
                        <picker :range="cityArray" @change="bindPickerChange">
                            <view class="uni-input">{{ cityArray[formData?.cityIndex] }}</view>
                        </picker>
                    </view>
                </view>
                <view class="gc-item-before">
                    <view>活动地址</view>
                    <view class="ml-20" @click="getLocation">{{ formData.location || '请输入选择活动地址' }}</view>
                </view>
                <view class="gc-item-before">
                    <view>活动时间</view>
                    <view class="ml-20">
                        <uni-datetime-picker :border="false" v-model="formData.startAt">
                            {{ formData.startAt || '请选择活动开始时间' }}
                        </uni-datetime-picker>
                    </view>
                </view>
                <view class="gc-item-before justify-between pr-20">
                    <view>活动人数</view>
                    <view class="ml-20">
                        <uni-number-box :min="2" v-model="formData.maxParticipants"/>
                    </view>
                </view>
                <view class="gc-item-before justify-between pr-20" style="overflow: initial">
                    <view>活动类型</view>
                    <view class="ml-20 w-full" @click="multiplePickerShow = true">
                        {{ formData?.categoryStr?.join('，') || '请选择活动类型' }}
                    </view>
                </view>
                <checkbox-group class="gc-item-before pr-20" @change="checkboxChange">
                    <label class="flex justify-between w-full">
                        <view>是否公开</view>
                        <checkbox color="#7f7eff" checked style="transform:scale(0.8)"/>
                    </label>
                </checkbox-group>
            </view>

            <view class="gc-title text-28 font-900 mb-30 mt-40">活动介绍</view>
            <view class="m-10">
                <uni-easyinput type="textarea" v-model="formData.description" autoHeight placeholder="请输入内容"/>
            </view>

            <view class="gc-title text-28 font-900 mb-20 mt-40">活动图片</view>
            <view class="m-20">
                <uni-file-picker limit="9" title="最多选择9张图片" :value="formData.imageDescription"/>
            </view>

            <view class="gc-title text-28 font-900 mb-20 mt-40 justify-between">
                <text>群二维码</text>
                <text class="text-gray-3 text-24">用户上车之后才会显示</text>
            </view>
            <view class="m-20">
                <uni-file-picker limit="1" :value="formData.groupQr"/>
            </view>
        </view>

        <view class="flex center w-full justify-between bg-primary fixed bottom-0 p-40 pt-30 pb-50"
              style="box-sizing: border-box">
            <view class="flex-1">
                <label class="center">
                    <checkbox value="cb" checked="true"/>
                    <view class="text-24"> 已阅读《即时设计须知》并知悉参与活动的要求请在规定时间内上传~</view>
                </label>
            </view>
            <view class="bg-black text-white p-20 b-rd-50 pl-60 pr-60" @click="createEvent">
                <text class="text-32">提交</text>
            </view>
        </view>
    </Layout>
    <MultiplePicker
        title="请选择活动类型"
        :show="multiplePickerShow"
        :columns="categoryList"
        @confirm="confirmMultiple"
        @cancel="multiplePickerShow = false"
    />
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import Layout from '@/components/layout/layout.vue';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import {onLoad, onPageScroll} from '@dcloudio/uni-app';
import {cityArray, EventCreateForm} from 'group-common';
import {view_categories, view_event_create} from "@/api/event/evnet";
import {toast} from "@/utils/uniapi/prompt";
import {onGoReplace} from "@/utils/business";
import MultiplePicker from '@/components/multiple-picker/multiple-picker.vue'

const categoryList = ref(),
    formData = reactive<Partial<EventCreateForm>>({
        categoryIds: [],
        categoryStr: [],
        isPublic: true,
        cityIndex: 0,
        city: "San Francisco Bay Area"
    }),
    scrollTop = ref(0),
    multiplePickerShow = ref(false)

function confirmMultiple(e: any) {
    e.selected.map((item: { label: string; }) => formData.categoryStr?.push(item?.label))
    formData.categoryIds = e.value
    multiplePickerShow.value = false;
}

function checkboxChange(e: any) {
    formData.isPublic = Boolean(e.detail.value.length)
}

function bindPickerChange(e) {
    formData.cityIndex = e.detail.value
    formData.city = cityArray[formData.cityIndex || 0]
}

async function getCategories() {
    const {data} = await view_categories()
    if (data?.success) categoryList.value = data.data?.map(item => {
        return {value: item.id, label: item.name}
    })
}

async function createEvent() {
    const {data} = await view_event_create(formData)
    if (data?.success) {
        toast('创建成功', {
            success: () => setTimeout(() => onGoReplace({name: 'post-detail', params: {id: data.data!.id}}), 1500)
        })
        return
    }
    return toast(data?.errorMessage || '创建失败')
}

function getLocation() {
    uni.chooseLocation({
        success: (res) => {
            formData.location = res.address
            formData.geoLocation = `POINT(${res.longitude} ${res.latitude})`
            console.log('位置名称：' + res.name);
            console.log('详细地址：' + res.address);
            console.log('纬度：' + res.latitude);
            console.log('经度：' + res.longitude);
        }
    });
}

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
onLoad(() => {
    getCategories()
})
</script>
<style scoped lang="scss">
@import '@/static/styles/common.scss';

:deep {
    .uni-select {
        border: 0;
    }
}
</style>
