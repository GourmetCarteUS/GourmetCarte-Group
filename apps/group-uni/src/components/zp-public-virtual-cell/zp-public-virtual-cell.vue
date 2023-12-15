<script setup lang="ts">
import StoreItem from '@/components/item/store.vue';
import RoomItem from '@/components/item/room.vue';
import OrderIn from '@/components/item/order-in.vue';
import BalanceItem from '@/components/item/balance.vue';
import OrderItem from '@/components/item/order.vue';

defineProps<{
    item: any;
    index: number;
    extraData: { id: string; total?: number };
}>();
</script>

<template>
    <StoreItem v-if="extraData?.id == 'stores'" :item="item" />
    <RoomItem v-else-if="extraData?.id == 'room'" :item="item" isClick />
    <OrderIn v-else-if="extraData?.id == 'mine'" :item="item" :index="index" :total="extraData?.total" />
    <OrderItem v-else-if="extraData?.id == 'order'" :item="item" isClick />
    <BalanceItem v-else-if="extraData?.id == 'balance'" :item="item" />
</template>
