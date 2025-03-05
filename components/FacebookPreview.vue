<script setup lang="ts">
import type { WebsiteMetadata } from '~/server/services/WebsiteMetadataService';
const props = defineProps<{
  metadata: WebsiteMetadata;
}>();

const formatUrl = (urlString: string) =>
  urlString
    .replace(/^https?:\/\/(www\.)?/, '')
    .split('/')[0];      
</script>
<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden w-full h-96">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold flex items-center text-black">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
        Facebook Preview
      </h2>
    </div>
    <div class="border border-gray-200 overflow-hidden bg-gray-200">
      <div v-if="metadata.image" class="w-full h-48 bg-gray-100">
        <img :src="metadata.image" alt="Preview" class="w-full h-full object-cover" />
      </div>
      <div class="p-3">
        <div class="text-gray-500 text-sm">{{ formatUrl(metadata.ogUrl) }}</div>
        <div class="font-bold text-black">{{ metadata.title || 'No title available' }}</div>
      </div>
    </div>
  </div>
</template>