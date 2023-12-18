<template>
    <Layout>
        <view class="center flex-col mt-200">
            <view>
                <image :src="logoUrl" class="w-200" mode="widthFix"/>
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
import {ref} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {useRouter} from 'uni-mini-router';
import {hideLoading, loading, toast} from '@/utils/uniapi/prompt';
import {useUserInfoStore} from '@/state/modules/user-info';
import {getUserLogin} from '@/api/user-info/user-info';
import useTokenStorage from '@/storage/token';

import logoUrl from '@/static/logo-1.png';
import {IUser} from 'group-common';
import Layout from '@/components/layout/layout.vue';

const redirectUrl = ref('');
const router = useRouter();
const formData = ref({
    telephone: '',
    password: '',
    code: '',
});

onLoad((params: any) => {
    if (params.redirect) {
        redirectUrl.value = JSON.parse(params.redirect);
    }
});

async function onWxLogin() {
    loading('登录中...');
    uni.login({
        success: async (res) => {
            const {code} = res;
            const resLogin = await getUserLogin(code);
            if (resLogin.data.code) {
                return toast(resLogin.data.msg);
            }
            useTokenStorage.setToken(resLogin.data.data);
            await loginSuccess();
        },
    });
}

async function loginSuccess() {
    const userInfo = (await useUserInfoStore().getUserInfo()) as IUser;
    hideLoading();
    if (!userInfo) return;
    if (redirectUrl.value) {
        return router.replace(redirectUrl.value);
    }
    if (!userInfo.id || !userInfo.displayName) return router.back();
    uni.navigateBack({
        fail: () => {
            router.replace({name: 'home'});
        },
    });
}

async function getPhoneNumber(e: { detail: { errMsg: string; code?: string } }) {
    if (e.detail.errMsg != 'getPhoneNumber:ok') {
        toast('请允许获取您的手机号');
        return;
    } else if (e.detail?.code) {
        //获取手机号
        const res = await getUserLogin(e.detail?.code);
        if (res.data.code) {
            return toast(res.data.msg);
        }
        await onWxLogin(res.data.data.purePhoneNumber);
    }
}
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';

.platform-wrapper {
    position: absolute;
    bottom: 200rpx;
    width: 100%;
    left: 0;

    .divider {
        width: 550rpx;
        margin: auto;
    }
}
</style>
