<script setup lang="ts">
defineProps<{
    size?: number;
    type: string;
    styles?: string;
}>();

const emits = defineEmits(['click']);
</script>

<template>
    <view :class="`t-icon t-icon-${type} ${styles}`" @click="emits('click')" style="background-repeat: no-repeat" :style="{ width: size, height: size }" />
</template>

<style scoped lang="scss">
.t-icon {
    display: flex;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
}
</style>
