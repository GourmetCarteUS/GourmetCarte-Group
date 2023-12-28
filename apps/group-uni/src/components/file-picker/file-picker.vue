<script setup lang="ts">
import { upload_file } from '@/api/common/common';
import { ref, watch } from 'vue';

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
        type: [Array, Object, String],
    },
});
const emit = defineEmits(['update:modelValue']);
const localValue = ref<any>([]),
    uploadPickerRef = ref();

async function pictureSelect() {
    const res = await Promise.all(
        uploadPickerRef.value.filesList.map(async (file: any, idx: number) => {
            if (file.status == 'ready') {
                const { data } = await upload_file(file.url);
                if (data?.success) {
                    uploadPickerRef.value?.manuallySetProgress(idx);
                    return data.data;
                }
            } else {
                return file.url;
            }
        })
    );
    if (prop.limit == '1') {
        emit('update:modelValue', res[0]);
    } else {
        emit('update:modelValue', res);
    }
}

function onDelete(e: { index: any }) {
    if (prop.limit == '1') {
        emit('update:modelValue', '');
    } else {
        localValue.value.splice(e.index, 1);
        emit(
            'update:modelValue',
            localValue.value.map((item: { url: any }) => item.url)
        );
    }
}

watch(
    () => prop.modelValue,
    (newValue) => {
        if (newValue) {
            if (prop.limit == '1') {
                localValue.value = {
                    name: newValue,
                    extname: 'png,jpg',
                    url: newValue,
                    status: 'success',
                };
            } else {
                localValue.value = newValue.map((item: any) => {
                    return {
                        name: item,
                        extname: 'png,jpg',
                        url: item,
                        status: 'success',
                    };
                });
            }
        }
    }
);
</script>

<template>
    <uni-file-picker :limit="limit" :title="title" v-model="localValue" ref="uploadPickerRef" @select="pictureSelect" @delete="onDelete" :auto-upload="false" />
</template>
