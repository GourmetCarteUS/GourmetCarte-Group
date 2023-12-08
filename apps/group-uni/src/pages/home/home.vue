<template>
  <Layout>
    <Main v-if="tabActiveIndex === 0" class="flex-1 flex flex-col"/>

    <Mine v-else-if="tabActiveIndex === 2" class="flex-1 flex flex-col"/>

<!--    <TabBar v-model="tabActiveIndex" :tab-bar-list="tabBarList"/>-->
  </Layout>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import Main from '@/pages/index/index.vue'
import Mine from '@/pages/mine/index.vue'
import Layout from '@/components/layout/layout.vue'
import TabBar from '@/components/tab-bar/tab-bar.vue'

import {useUserInfoStore} from '@/state/modules/user-info'
import {getEnvValue, isDevMode} from '@/utils/env'
import {onLoad, onShareAppMessage, onShareTimeline} from '@dcloudio/uni-app'
import CustomShareContent = Page.CustomShareContent;
import {onGoPage} from "@/utils/business";

const tabActiveIndex = ref(0)
const tabBarList = [
  {
    index: 1,
    title: "首页",
    icon: "home",
    handleClick: () => tabActiveIndex.value = 0
  },
  {
    index: 2,
    title: "扫一扫",
    icon: "scan",
    float: true,
    handleClick: () => onGoPage({name: "scan"}, false)
  },
  {
    index: 3,
    title: "我的",
    icon: "person",
    handleClick: () => tabActiveIndex.value = 2
  }
]

onLoad(params => {
  if (params?.tab === 'mine') tabActiveIndex.value = 2
})

onShareAppMessage((): CustomShareContent => {
  const shareImages = [
    'https://open.sereinapp.com/mailbox/app-material/share.png',
    'https://open.sereinapp.com/mailbox/app-material/shaare-2.png',
  ]
  return {
    title: getEnvValue('VITE_PROJECT_TITLE') + '-拥有浪漫寓意的信箱递送服务',
    path: `/pages/home/home`,
    imageUrl: shareImages[0],
    type: isDevMode() ? '1' : '0',
  }
})

onShareTimeline(() => {
  const shareImages = [
    'https://open.sereinapp.com/mailbox/app-material/share.png',
    'https://open.sereinapp.com/mailbox/app-material/shaare-2.png',
  ]
  return {
    title: getEnvValue('VITE_PROJECT_TITLE') + '-拥有浪漫寓意的信箱递送服务',
    path: `/pages/home/home`,
    imageUrl: shareImages[1],
    type: isDevMode() ? 1 : 0,
  }
})

// 初始化数据
useUserInfoStore().initUserInfo()
</script>
