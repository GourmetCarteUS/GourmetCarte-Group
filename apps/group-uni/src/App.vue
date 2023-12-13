<script setup lang="ts">
import {onLaunch, onShow, onHide} from "@dcloudio/uni-app";

/**
 * 导航高度
 */
function initCom() {
  let statusBarHeight_ = 20,/* 状态栏高度 */
      navBarHeight_ = 45,/* 导航栏高度 */
      windowWidth_ = 375;/* 窗口宽度 */
  // 获取手机系统信息
  const info = uni.getSystemInfoSync()
  // 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）
  const _statusBarHeight = info.statusBarHeight || 20
  statusBarHeight_ = _statusBarHeight
  // 除了h5 app mp-alipay的情况下执行
  // #ifndef H5 || APP-PLUS || MP-ALIPAY
  // 获取胶囊的位置
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  // (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
  navBarHeight_ = (menuButtonInfo.bottom - _statusBarHeight) + (menuButtonInfo.top - _statusBarHeight)
  windowWidth_ = menuButtonInfo.left
  // #endif
  uni.setStorageSync("navStyle", {statusBarHeight_, navBarHeight_, windowWidth_})
}

initCom()

onLaunch(() => {
  console.log("App Launch");
  uni?.hideTabBar()
});
onShow(() => {
  console.log("App Show");
  uni?.hideTabBar()
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "@/static/iconfont/iconfont-weapp-icon.css";
</style>
