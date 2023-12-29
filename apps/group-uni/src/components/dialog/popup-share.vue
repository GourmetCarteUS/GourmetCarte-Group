<script setup lang="ts">
import { ref } from 'vue';

const shareRef = ref();

function shareToggle() {
    shareRef.value.open();
}

defineExpose({ shareToggle });
</script>

<template>
    <uni-popup ref="shareRef" type="share" safeArea backgroundColor="#fff">
        <uni-popup-share />
    </uni-popup>
</template>

<style scoped lang="scss"></style>
