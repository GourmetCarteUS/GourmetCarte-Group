<template>
  <view class="page-container" :style="{background}" :class="{styles}">
    <slot name="header"/>
    <view class="page-wrapper flex-1 flex flex-col">
      <template v-if="mode === 'scroll-y'">
        <scroll-view class="h-full flex-1 flex-col" enable-back-to-top enable-flex scroll-y @scroll="onScroll">
          <slot/>
        </scroll-view>
      </template>
      <template v-else-if="mode === 'none'">
        <slot/>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {ref, useSlots} from 'vue'

// const isHeader = !!useSlots().header;

const props = defineProps({
  mode: String,
  background: String,
  styles: String
})

const mode = ref(props['mode'] || 'scroll-y')
</script>


<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(180, 245, 106, 1) 0%, rgba(255, 255, 255, 0) 70%);

  .page-wrapper {
    width: 100%;
    overflow: hidden;
  }

  .scroll-view {
    height: 100%;
  }
}

</style>
