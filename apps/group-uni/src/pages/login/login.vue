<template>
    <Layout>
        <view class="center flex-col mt-200">
            <view>
                <image :src="logoUrl" class="w-200" mode="widthFix" />
            </view>

            <view class="text-30 font-medium mt-50 text-gray-800">咕噜拼</view>

            <!--            <view class="center flex-col mt-50">-->
            <!--                <view class="text-28 font-medium text-gray-800">登录小程序</view>-->
            <!--                &lt;!&ndash;                <view class="text-24 text-gray-600 mt-10">获取你的公开信息用于登录注册</view>&ndash;&gt;-->
            <!--            </view>-->
        </view>
        <button class="bg-primary text-white m-100" @click="onWxLogin">登录</button>
    </Layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useRouter } from 'uni-mini-router';
import { hideLoading, loading, toast } from '@/utils/uniapi/prompt';
import { useUserInfoStore } from '@/state/modules/user-info';
import { user_login } from '@/api/user-info/user-info';
import useTokenStorage from '@/storage/token';

import logoUrl from '@/static/images/logo.png';
import Layout from '@/components/layout/layout.vue';
import { onGoTab } from '@/utils/business';

const redirectUrl = ref('');
const redirectTab = ref('');
const router = useRouter();
const formData = ref({
    telephone: '',
    password: '',
    code: '',
});

onLoad((params: any) => {
    if (params?.redirect) {
        redirectUrl.value = JSON.parse(params.redirect);
    } else if (params?.tab) {
        redirectTab.value = JSON.parse(params?.tab);
    }
});

async function onWxLogin() {
    loading('登录中...');
    uni.login({
        success: async (res) => {
            const { code } = res;
            const { data } = await user_login(code);
            if (data?.success) {
                useTokenStorage.setToken(data.data!);
                await loginSuccess();
                return;
            }
            return toast(data?.errorMessage || '登录失败');
        },
    });
}

async function loginSuccess() {
    const userInfo = await useUserInfoStore().getUserInfo();
    hideLoading();
    if (!userInfo) return;
    if (redirectUrl.value) {
        return router.replace(redirectUrl.value);
    } else if (redirectTab.value) {
        return router.pushTab(redirectTab.value);
    }
    if (!userInfo.id || !userInfo.displayName) return router.back();
    uni.navigateBack({
        fail: () => {
            onGoTab({ name: 'home' });
        },
    });
}
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';
</style>
