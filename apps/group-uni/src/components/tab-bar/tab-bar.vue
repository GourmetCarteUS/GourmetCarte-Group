<template>
    <view class="flex flex-col" :class="float ? 'tabBar-body' : 'tabBar-body-bottom'">
        <view class="flex">
            <view class="tqb-tabBar-item">
                <view
                    class="tabBar-item-body"
                    v-for="tabItem in tabBarList"
                    :key="tabItem.index"
                    :class="{ float: tabItem?.float, active: tabItem?.active }"
                    @click="onClick(tabItem)"
                >
                    <view class="tabBar-item-icon">
                        <uni-icons :type="tabItem.icon" :size="tabItem?.float ? 48 : 28" :color="tabItem?.float ? 'white' : tabItem?.active ? '#7F7EFF' : ''" />
                    </view>
                    <view class="tab-bar-text" :class="{ 'text-primary': tabItem?.active }">{{ tabItem.title }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
const emits = defineEmits(['update:modelValue']);

interface TabItemType {
    index: number;
    title: string;
    icon: string;
    float?: boolean;
    active?: boolean;
    handleClick?: Function;
}

defineProps({
    float: {
        type: Boolean,
        value: false,
    },
    tabBarList: {
        type: Array<TabItemType>,
        default: [],
    },
    modelValue: {
        type: Number,
        default: 1,
    },
});

function onClick(tabItem: TabItemType) {
    // if (props.modelValue == tabItem.index) return;
    tabItem.handleClick && tabItem?.handleClick();
    // if (tabItem.index === 2) return
    // emits('update:modelValue', tabItem.index)
}
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';

.tabBar-body {
    border-radius: 80rpx;
    background: white;
    position: fixed;
    bottom: 50rpx;
    width: 95%;
    left: 50%;
    transform: translateX(-50%);
    padding: 10rpx 0;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
}

.tabBar-body-bottom {
    padding: 10rpx 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.15) 0 0 3.2px;
    padding-bottom: 30rpx;
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
                width: 100rpx;
                height: 100rpx;
                border-radius: 20px;
                background-color: $uni-color-primary;
                display: flex;
                align-items: center;
                border: 14rpx solid white;
                margin-top: -50%;
                //box-shadow: rgba(0, 0, 0, 0.15) 0 0 3.2px;
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
        font-size: 20rpx;
        margin-top: 5rpx;
    }
}
</style>
