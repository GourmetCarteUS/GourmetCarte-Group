<template>
    <Layout>
        <template #header>
            <NavBar :title="`${text}活动`" :backgroundColor="scrollTop >= 80 ? 'white' : undefined" />
        </template>
        <view class="bg-white m-40 p-40 b-rd-50 pb-800">
            <view class="gc-title text-28 font-900 mb-30">发布新活动</view>
            <view class="mt-20">
                <view class="gc-item">
                    <view>活动名称</view>
                    <view class="ml-20"><input type="text" v-model="formData.title" placeholder="请输入活动名称" /> </view>
                </view>
                <view class="gc-item">
                    <view>举办城市</view>
                    <view class="ml-20">
                        <picker :range="cityArray" @change="bindPickerChange">
                            <view class="uni-input">{{ cityArray[formData?.cityIndex] }}</view>
                        </picker>
                    </view>
                </view>
                <view class="gc-item">
                    <view>活动地址</view>
                    <!--                    <view class="ml-20" @click="getLocation">{{ formData.location || '请输入选择活动地址' }}</view>-->
                    <view class="flex-1">
                        <InputAutocomplete placeholder="请输入活动地址" @input="debounceAutocomplete" :data="InputAutocompleteData" v-model="formData.location" />
                    </view>
                </view>
                <view class="gc-item">
                    <view>活动时间</view>
                    <view class="ml-20">
                        <uni-datetime-picker :border="false" v-model="formData.startAt" return-type="date">
                            <uni-dateformat v-if="formData.startAt" :date="formData.startAt"></uni-dateformat>
                            <text v-else style="color: #999">请选择活动开始时间</text>
                        </uni-datetime-picker>
                    </view>
                </view>
                <view class="gc-item justify-between pr-20">
                    <view>活动人数</view>
                    <view class="ml-20">
                        <uni-number-box :min="2" v-model="formData.maxParticipants" />
                    </view>
                </view>
                <view class="gc-item justify-between pr-20" style="overflow: initial">
                    <view>活动类型</view>
                    <view class="ml-20 flex-1" @click="multiplePickerShow = true">
                        <text v-if="formData?.categoryStr?.join('，')">
                            {{ formData?.categoryStr?.join('，') }}
                        </text>
                        <text v-else style="color: #999">请选择活动类型</text>
                    </view>
                </view>
                <checkbox-group class="gc-item pr-20" @change="checkboxChange">
                    <label class="flex justify-between w-full">
                        <view>是否公开</view>
                        <checkbox color="#7f7eff" :checked="formData.isPublic" style="transform: scale(0.8)" />
                    </label>
                </checkbox-group>
            </view>

            <view class="gc-title text-28 font-900 mb-30 mt-40">活动介绍</view>
            <view class="m-10">
                <uni-easyinput type="textarea" :maxlength="-1" v-model="formData.description" autoHeight placeholder="请输入内容" />
            </view>

            <view class="gc-title text-28 font-900 mb-20 mt-40">活动图片</view>
            <view class="m-20">
                <FilePicker title="最多选择9张图片" limit="9" v-model="formData.imageDescription" />
            </view>

            <view class="gc-title text-28 font-900 mb-20 mt-40 justify-between" @click="onGoPage({ name: 'help-create-group' }, false)">
                <view class="center">群二维码 <text class="text-red text-24">（必填）</text> </view>
                <view>
                    <!--                    <text class="">用户上车之后才会显示</text>-->
                    <text class="text-24 text-primary mt-20">📖 查看建群教程</text>
                </view>
            </view>
            <view class="m-20">
                <view class="text-gray-3 text-24 mb-10">用户上车之后才会显示，退出小程序建群并重新进入小程序，您之前填写的信息将在15分钟内保留</view>
                <FilePicker limit="1" v-model="formData.groupQr" />
            </view>
        </view>

        <view class="flex center w-full justify-between bg-primary fixed bottom-0 p-40 pt-30 pb-50" style="box-sizing: border-box; z-index: 9">
            <view class="flex-1">
                <!--                <label class="center">-->
                <!--                    <checkbox value="cb" checked />-->
                <!--                    <view class="text-24"> 已阅读《即时设计须知》并知悉参与活动的要求请在规定时间内上传~</view>-->
                <!--                </label>-->
            </view>
            <view class="bg-black text-white p-20 b-rd-50 pl-60 pr-60" @click="debounceCreateEvent">
                <text class="text-32">提交</text>
            </view>
        </view>
    </Layout>
    <MultiplePicker
        title="请选择活动类型"
        :show="multiplePickerShow"
        :columns="categoryList"
        :defaultIndex="formData.categoryIds"
        @confirm="confirmMultiple"
        @cancel="multiplePickerShow = false"
    />
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import debounce from 'lodash/debounce';
import Layout from '@/components/layout/layout.vue';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import { onHide, onLoad, onPageScroll, onShow } from '@dcloudio/uni-app';
import { cityArray, EventCreateForm } from 'group-common';
import { edit_create_event, edit_modify_event, view_categories, view_event_detail } from '@/api/event/evnet';
import { hideLoading, loading, toast } from '@/utils/uniapi/prompt';
import { onBack, onGoPage, onGoReplace } from '@/utils/business';
import MultiplePicker from '@/components/multiple-picker/multiple-picker.vue';
import FilePicker from '@/components/file-picker/file-picker.vue';
import dayjs from 'dayjs';
import { useUserInfoStore } from '@/state/modules/user-info';
import InputAutocomplete from '@/components/input-autocomplete/input-autocomplete.vue';
import { location_autocomplete } from '@/api/common/common';

const categoryList = ref(),
    formData = reactive<Partial<EventCreateForm>>({
        categoryIds: [],
        categoryStr: [],
        isPublic: true,
        cityIndex: 0,
        city: 'Bay Area',
    }),
    scrollTop = ref(0),
    text = ref('创建'),
    isNew = ref(true),
    InputAutocompleteData = ref<string[]>(),
    multiplePickerShow = ref(false);

const debounceAutocomplete = debounce(getAutocomplete, 1000);
const debounceCreateEvent = debounce(createEvent, 500);

function confirmMultiple(e: any) {
    e.selected.map((item: { label: string }) => formData.categoryStr?.push(item?.label));
    formData.categoryIds = e.value;
    multiplePickerShow.value = false;
}

function checkboxChange(e: any) {
    formData.isPublic = Boolean(e.detail.value.length);
}

async function getAutocomplete(keyword: string) {
    if (keyword) {
        const { data } = await location_autocomplete(keyword);
        if (data?.success) {
            InputAutocompleteData.value = data.data?.map((item) => item.description);
        }
    }
}

function bindPickerChange(e: any) {
    formData.cityIndex = e.detail.value;
    formData.city = cityArray[formData.cityIndex || 0];
}

async function getCategories() {
    const { data } = await view_categories();
    if (data?.success)
        categoryList.value = data.data?.map((item) => {
            return { value: item.id, label: item.name };
        });
}

async function createEvent() {
    if (!formData?.groupQr) {
        return toast('请上传群二维码');
    }
    await onSubscribe();
    loading();
    const { data } = isNew.value ? await edit_create_event(formData) : await edit_modify_event(formData);
    hideLoading();
    if (data?.success) {
        uni.removeStorageSync('createEvent');
        toast(`${text.value}成功`, {
            success: () => setTimeout(() => onGoReplace({ name: 'post-detail', params: { id: data.data!.id } }), 500),
        });
        return;
    }
    return toast(data?.errorMessage || `${text.value}失败`);
}

function getLocation() {
    uni.chooseLocation({
        success: (res) => {
            formData.location = res.address;
            formData.geoLocation = `POINT(${res.longitude} ${res.latitude})`;
            console.log('位置名称：' + res.name);
            console.log('详细地址：' + res.address);
            console.log('纬度：' + res.latitude);
            console.log('经度：' + res.longitude);
        },
    });
}

async function getEvent(id: string) {
    loading();
    const { data } = await view_event_detail(id);
    if (data?.errorCode) {
        toast(data?.errorMessage || '暂无该数据', { complete: () => setTimeout(onBack, 1500) });
    } else {
        Object.assign(formData, data!.data);
        // @ts-ignore
        formData.startAt = dayjs(formData.startAt).format('YYYY-MM-DD HH:mm:ss').toString();
        formData.categoryIds = formData.category?.map((item) => item.id);
        formData.categoryStr = formData.category?.map((item) => item.name);
        formData.cityIndex = cityArray.findIndex((item) => item == formData.city);
        if (formData.cityIndex < 0) formData.cityIndex = 0;
    }
    hideLoading();
}

function onSubscribe() {
    return new Promise((resolve, reject) => {
        uni.requestSubscribeMessage({
            tmplIds: ['HtYFXDb6S8yLYOG1r4oGQGdjMiYOPVeFKuZISGNU7zY', 'whvZi7swOrbC1TqXmz4Yr3zh9JhmbH-ruDkc3CAlrU0', '7V7vb2dVYBhLefYm_ohSSJXtJ4adONn8P0INXxglexA'],
            complete(res) {
                console.log(res);
                resolve(true);
            },
        });
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
onLoad((params) => {
    if (params?.id) {
        if (!params?.type) {
            isNew.value = false;
            text.value = '修改';
        }
        getEvent(params?.id);
    } else {
        formData.cityIndex = cityArray.findIndex((item) => item == useUserInfoStore().currentCity);
        if (formData.cityIndex < 0) formData.cityIndex = 0;
    }
    getCategories();
});

onHide(() => uni.setStorageSync('createEvent', formData));
onShow(() => {
    const event = uni.getStorageSync('createEvent');
    Object.assign(formData, event);
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
