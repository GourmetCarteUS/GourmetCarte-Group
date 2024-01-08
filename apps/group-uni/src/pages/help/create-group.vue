<template>
    <view>
        <uni-group title="1. 首先在手机中打开微信，在菜单中点击“微信”，再点击右上角的“+”图标，在弹出的窗口中点击“发起群聊”。" mode="card">
            <image :src="createGroupImg1" class="h-full w-full" mode="widthFix" />
        </uni-group>

        <uni-group title="2.在发起群聊页面，点击“面对面建群”，开始建立群聊。" mode="card">
            <image :src="createGroupImg2" class="h-full w-full" mode="widthFix" />
        </uni-group>
        <uni-group title="3.在面对面建群里面任意输入4个数字，发起群聊。" mode="card">
            <image :src="createGroupImg3" class="h-full w-full" mode="widthFix" />
        </uni-group>
        <uni-group title="4.输入完数字后，点击“进入该群”，因为是一个人群聊，不用等待好友加入。" mode="card">
            <image :src="createGroupImg4" class="h-full w-full" mode="widthFix" />
        </uni-group>
        <uni-group title="5.进入群聊后即可发现群聊中只有自己一个成员，一个人的群聊建立成功。" mode="card">
            <image :src="createGroupImg5" class="h-full w-full" mode="widthFix" />
        </uni-group>
        <uni-group title="6.点击“群二维码”生成二维码，点击“保存到通讯录”防止群丢失。" mode="card">
            <image :src="createGroupImg6" class="h-full w-full" mode="widthFix" />
        </uni-group>
        <uni-group mode="card">
            <template #title>
                <view class="text-28" style="color: #666; padding: 20rpx 30rpx; background-color: #eee">
                    7.点击“保存二维码”，可以获取群的二维码，<text class="text-red font-500">二维码有效期只有7天</text>，请注意过期时间防止用户无法加入。
                </view>
            </template>
            <image :src="createGroupImg7" class="h-full w-full" mode="widthFix" />
        </uni-group>
    </view>
</template>

<style scoped lang="scss">
@import '@/static/styles/common.scss';
</style>
<script setup lang="ts">
import createGroupImg1 from '@/static/images/create-group-1.png';
import createGroupImg2 from '@/static/images/create-group-2.png';
import createGroupImg3 from '@/static/images/create-group-3.png';
import createGroupImg4 from '@/static/images/create-group-4.png';
import createGroupImg5 from '@/static/images/create-group-5.png';
import createGroupImg6 from '@/static/images/create-group-6.png';
import createGroupImg7 from '@/static/images/create-group-7.png';
</script>
