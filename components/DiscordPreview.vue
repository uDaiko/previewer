<template>
    <!-- Discord Preview -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <circle cx="9" cy="12" r="1"></circle>
                    <circle cx="15" cy="12" r="1"></circle>
                    <path d="M7.5 7.5c3.5-1 5.5-1 9 0"></path>
                    <path d="M7.5 16.5c3.5 1 5.5 1 9 0"></path>
                    <path
                        d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5">
                    </path>
                    <path
                        d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.48-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5">
                    </path>
                </svg>
                Discord Preview
            </h2>
        </div>
        <div class="p-4">
            <div class="bg-gray-800 rounded-lg overflow-hidden text-white">
                <div class="p-3 border-l-4 border-blue-500 text-left">
                    <div class="text-gray-400 text-xs mt-2">{{ metadata.site_name }}</div>
                    <div class="text-blue-700 text-sm line-clamp-2">{{ metadata.description }}</div>
                    <div class="font-bold">{{ metadata.title || 'No title available' }}</div>
                    <div v-if="metadata.image" class="w-full h-48 bg-gray-700 rounded mb-2">
                        <img :src="metadata.image" alt="Preview" class="w-full h-full object-cover rounded" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    metadata: Metadata;
}>();

interface Metadata {
    site_name?: string
    title?: string;
    description?: string;
    image?: string;
    ogUrl?: string;
}
</script>



<style scoped>
/* Optional styles for rounded corners and shadow */
</style>