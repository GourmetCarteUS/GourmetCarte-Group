<template>
  <view class="navbar">
    <view class="navbar-fixed" :style="{'background-color': backgroundColor}">
      <!-- 状态栏小程序撑起高度 -->
      <view :style="{height:statusBarHeight+'px'}"></view>
      <view v-if="title" class="navbar-content">
        <view class="font-500 text-32 text-center w-full">{{ title }}</view>
      </view>
      <view v-else class="navbar-content" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
        <view class="navbar-search" :class="{border: backgroundColor==='white'}">
          <view class="navbar-search_icon">
            <uni-icons type="search" size="16" color="#999"></uni-icons>
          </view>
          <view class="navbar-serach">
            <input class="navbar-search_text" type="text" v-model="val" placeholder="请输入您要搜索的内容"/>
          </view>
        </view>

      </view>
    </view>
    <!-- 需要添加占位符高度  状态栏高度+导航栏高度（否则下面tab会塌陷）-->
    <view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
  </view>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

defineProps({
  backgroundColor: {
    default: 'transparent',
    type: String
  },
  title: String
})

const statusBarHeight = ref(20),/* 状态栏高度 */
    navBarHeight = ref(45),/* 导航栏高度 */
    windowWidth = ref(375),/* 窗口宽度 */
    /* 设定状态栏默认高度 */
    val = ref('')/* 导航栏搜索框的值 */

function initCom() {
  const {statusBarHeight_, navBarHeight_, windowWidth_} = uni.getStorageSync("navStyle")
  statusBarHeight.value = statusBarHeight_
  navBarHeight.value = navBarHeight_
  windowWidth.value = windowWidth_
}

initCom()
</script>

<style lang="scss">

.navbar {
  .navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    background-color: transparent;

    .navbar-content {
      display: flex;
      //justify-content: center;
      align-items: center;
      padding: 0 15px;
      height: 45px;
      box-sizing: border-box;
      justify-content: flex-start;

      .navbar-search {
        display: flex;
        align-items: center;
        padding: 0 10px;
        width: 100%;
        height: 30px;
        border-radius: 30px;
        background-color: #fff;
        border: 1rpx solid white;

        &.border {
          border: 1rpx solid rgba(229, 229, 229, 1);
        }

        .navbar-search_icon {
          margin-right: 10px;
        }

        .navbar-search_text {
          width: 100%;
          font-size: 14px;
          color: #999;
        }
      }

      &.search {
        padding-left: 0;

        .navbar-content__search-icons {
          margin-left: 10px;
          margin-right: 10px;
        }

        .navbar-search {
          border-radius: 5px;
        }
      }
    }
  }
}
</style>

