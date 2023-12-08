<template>
  <view class="flex flex-col" :class="float?'tabBar-body':'tabBar-body-bottom'">
    <view class="flex">
      <view class="tqb-tabBar-item">
        <view class="tabBar-item-body" v-for="tabItem in tabBarList" :key="tabItem.index"
              :class="{float: tabItem?.float, active: modelValue === tabItem.index}"
              @click="onClick(tabItem)">
          <view class="tabBar-item-icon">
            <uni-icons :type="tabItem.icon" :size="tabItem?.float?48:28"
                       :color="modelValue === tabItem.index ? '#FBDA41': ''"/>
          </view>
          <view class="tab-bar-text">{{ tabItem.title }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const emits = defineEmits(['update:modelValue'])

interface TabItemType {
  index: number
  title: string
  icon: string
  float?: boolean
  handleClick?: Function
}

const props = defineProps({
  float: {
    type: Boolean,
    value: false
  },
  tabBarList: {
    type: Array<TabItemType>,
    default: []
  },
  modelValue: {
    type: Number,
    default: 1
  }
});

function onClick(tabItem: TabItemType) {
  if (props.modelValue == tabItem.index) return;
  tabItem.handleClick && tabItem?.handleClick()
  if (tabItem.index === 2) return
  emits('update:modelValue', tabItem.index)
}

</script>

<style lang="scss" scoped>

.tabBar-body {
  border-radius: 80rpx;
  background: white;
  position: fixed;
  bottom: 50rpx;
  width: 95%;
  left: 50%;
  transform: translateX(-50%);
  padding: 20rpx 0;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
}

.tabBar-body-bottom {
  padding: 20rpx 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
}

.tqb-tabBar-item {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  align-items: flex-end;

  .tabBar-item-body {
    &.float {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .tabBar-item-icon {
        width: 146rpx;
        height: 146rpx;
        border-radius: 50px;
        background-color: $uni-color-primary;
        display: flex;
        align-items: center;
        border: 14rpx solid white;
        margin-top: -50%;
      }
    }

    &.active {
      //color: $uni-color-primary;
    }
  }

  .tabBar-item-icon {
    display: flex;
    justify-content: center;
  }

  .tab-bar-text {
    font-size: 28rpx;
    margin-top: 8rpx;
  }
}
</style>
