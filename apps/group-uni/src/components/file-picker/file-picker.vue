<script setup lang="ts">
import { upload_file } from '@/api/common/common';
import { ref } from 'vue';

const prop = defineProps({
    title: {
        default: '',
        type: String,
    },
    limit: {
        default: '1',
        type: String,
    },
    modelValue: {
        type: [Array, Object],
        default() {
            return [];
        },
    },
});
const emit = defineEmits(['update:modelValue']);

const localValue = ref([]),
    uploadVideo = ref();

async function pictureSelect(event: { tempFiles: any[]; tempFilePaths: string[] }) {
    const res = await Promise.all(
        event.tempFilePaths.map(async (tempFiles, idx) => {
            const { data } = await upload_file(tempFiles);
            if (data?.success) {
                uploadVideo.value?.manuallySetProgress(idx);
                return data.data;
            }
            return '';
        })
    );
    if (prop.limit == '1') {
        emit('update:modelValue', res[0]);
    } else {
        emit('update:modelValue', res);
    }
}
</script>

<template>
    <uni-file-picker :limit="limit" :title="title" :value="localValue" ref="uploadVideo" @select="pictureSelect" :auto-upload="false" />
</template>

<style scoped lang="scss"></style>
