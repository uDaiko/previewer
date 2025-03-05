<script setup lang="ts">

import type { WebsiteMetadata } from '~/server/services/WebsiteMetadataService';


const props = defineProps<{
    metadata: WebsiteMetadata;
}>();

const domain = computed(() => {
    if (!props.metadata.ogUrl) return '';
    try {
        return new URL(props.metadata.ogUrl).hostname.replace(/^www\./, '');
    } catch {
        return props.metadata.ogUrl;
    }
});
</script>

<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden w-full h-96">
        <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold flex items-center text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <line x1="4" y1="4" x2="20" y2="20"></line>
                    <line x1="20" y1="4" x2="4" y2="20"></line>
                </svg>
                X Preview
            </h2>
        </div>

        <div class="relative aspect-[1.91/1] bg-black">
            <div v-if="metadata.image" class="absolute inset-0">
                <img :src="metadata.image" alt="Preview" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div class="bg-black bg-opacity-70 p-2 rounded inline-block">
                    <div class="text-sm font-medium text-white line-clamp-2">
                        {{ metadata.twitter_title || metadata.title || 'No title available' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
