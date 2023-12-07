<script setup lang="ts">
import {ref} from "vue";

const value = ref<Number>()
</script>

<template>
  <view class="bg-gray-200 p-15 flex b-rd-40 mb-30">
    <view class="mr-20">
      <image src="https://img.js.design/assets/img/6384d4523a4c0127ccb55505.png" class="h-240 b-rd-40"
             mode="heightFix"/>
    </view>

    <view class="w-full">
      <view class="flex flex-items-center flex-justify-between">
        <view class="mb-40">
          <view class="text-28 mb-20">棕色天鹅绒椅子</view>
          <view class="text-40">$ 130</view>
        </view>
        <view class="mr-50">
          <uni-icons type="trash" size="24" color="#9A9390" class="h-50"/>
        </view>
      </view>

      <view>
        <uni-number-box v-model="value"/>
      </view>
    </view>

  </view>
</template>