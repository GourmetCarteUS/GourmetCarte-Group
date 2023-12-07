<template>
  <view class="card p-20 mb-20 pt-15" :class="styles">
    <view class="header flex flex-justify-between h-60 flex-items-center">
      <slot name="title"></slot>
      <slot name="sub-title"></slot>
    </view>
    <view class="body">
      <slot name="body"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  styles: String
})

</script>

<style scoped lang="scss">
.card {
  background: white;
  //border-radius: 4rpx;

  .header {
    border-bottom: 1px dashed #C7C7C7;
  }
}

</style>