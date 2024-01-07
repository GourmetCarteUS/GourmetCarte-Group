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
</script>
