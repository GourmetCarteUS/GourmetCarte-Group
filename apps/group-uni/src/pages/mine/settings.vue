<template>
    <uni-popup ref="popupRef" background-color="#fff" type="bottom" @mask-click="popupRef?.close">
        <view class="pt-70 pl-60 pr-60 pb-30 h-700">
            <view class="btn-close">
                <uni-icons color="#ccc" size="40rpx" type="closeempty" @click="popupRef?.close" />
            </view>
            <view class="text-30">获取您的昵称、头像</view>
            <view class="text-24 text-neutral-400 pt-10"> 获取用户头像、昵称，主要用于向用户提供具有辨识度的用户中心界面 </view>
            <view class="avatar-wrapper">
                <button class="btn relative w-150 h-150 center" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                    <image :src="userForm?.avatar || avatarDefaultUrl" class="w-150 h-150 rd-200" />
                    <view class="absolute">
                        <uni-icons color="#BCA474" size="70rpx" type="camera-filled"></uni-icons>
                    </view>
                </button>
            </view>
            <view class="mt-55">
                <input
                    :font-size="27"
                    v-model="userForm.name"
                    @blur="(e) => (userForm.name = e.detail.value)"
                    class="h-50 leading-70 p-20 pt-10 pb-10 text-28 rd-50 border-1 border-solid border-gray-300"
                    placeholder="请输入用户名"
                    type="nickname"
                />
            </view>
            <view class="mt-20">
                <input
                    :font-size="27"
                    v-model="userForm.contact"
                    class="h-50 leading-70 p-20 pt-10 pb-10 text-28 rd-50 border-1 border-solid border-gray-300"
                    placeholder="请输入联系方式"
                />
            </view>
            <button class="mt-40 text-31 bg-blue-700 text-white rd-50 bg-primary" @click="onSubmit">保存</button>
        </view>
    </uni-popup>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { upload_file } from '@/api/common/common';
import { useUserInfoStore } from '@/state/modules/user-info';
import { modify_user_info } from '@/api/user-info/user-info';
import { loading } from '@/utils/uniapi/prompt';
import avatarDefaultUrl from '@/static/images/logo.png';
import { sleep } from '@/utils/utils';

const popupRef = ref();
const userInfo = computed(() => useUserInfoStore().user);

const userForm = reactive<{
    name: string;
    avatar: string | undefined;
    contact: string | undefined;
}>({
    name: userInfo.value?.displayName || '',
    avatar: userInfo.value?.avatarUrl,
    contact: userInfo.value?.contact || '',
});

async function onChooseAvatar(res: any) {
    // #ifdef MP-WEIXIN
    const avatarTempUrl = res.detail.avatarUrl;
    if (!avatarTempUrl) return;
    const { data } = await upload_file(avatarTempUrl);
    if (data?.success) userForm.avatar = data.data;
    // #endif

    // #ifndef MP-WEIXIN
    uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: async (res) => {
            const tempFilePaths = res.tempFilePaths[0];
            const { data } = await upload_file(tempFilePaths!);
            if (data?.success) userForm.avatar = data.data;
        },
    });
    // #endif
}

async function onSubmit() {
    loading('保存中...');
    try {
        await modify_user_info({
            displayName: userForm.name.toString().trim(),
            avatarUrl: userForm?.avatar || undefined,
            contact: userForm.contact,
        });
        await sleep(1000);
        await useUserInfoStore().updateUserInfo();
    } catch (e) {
        uni.hideLoading();
        return;
    }
    uni.hideLoading();
    popupRef.value.close();
}

function handleOpen() {
    popupRef.value?.open();
}

defineExpose({ handleOpen });
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';

.btn-close {
    position: absolute;
    right: 40rpx;
    top: 30rpx;
}

.avatar-wrapper {
    height: 150rpx;
    width: 150rpx;
    margin: 50rpx auto 0;
    position: relative;
    border-radius: 100%;
    box-shadow: 0 0 5rpx 0 #ccc;
    background: transparent;
}

.btn {
    padding: 0;
    margin: 0;
    background: transparent;
    border-radius: 50%;
}
</style>
