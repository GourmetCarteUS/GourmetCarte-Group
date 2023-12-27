<script setup lang="ts">


defineProps<{
    item: any;
    index: number;
    extraData: { id: string; total?: number };
}>();
</script>

<template>
    <!--    <StoreItem v-if="extraData?.id == 'stores'" :item="item" />-->
    <!--    <RoomItem v-else-if="extraData?.id == 'room'" :item="item" isClick />-->
</template>
