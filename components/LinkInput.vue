<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-6">
    <div class="max-w-3xl w-full">
      <h1 class="text-3xl font-bold text-center mb-8 text-black">Previewer</h1>

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-col items-center gap-4">
          <input v-model="siteLink" type="url" placeholder="Enter a site URL" required @keyup.enter="handleFetch" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-800
    text-white" />
          <button @click="handleFetch"
            class="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            :disabled="loading">
            {{ loading ? 'Loading...' : 'Create Preview' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-xl text-center mt-8">Loading…</div>

    <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="metadata" class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <XPreview :metadata="metadata" />
      <DiscordPreview :metadata="metadata" />
      <FacebookPreview :metadata="metadata" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFetchMetaData } from "~/composables/useFetchMetaData";

const siteLink = ref("");

const { metadata, loading, error, fetchMetaData } = useFetchMetaData();

function handleFetch() {
  const url = siteLink.value.trim();
  if (url && !/^https?:\/\//i.test(url)) {
    fetchMetaData(`https://${url}`);
  } else if (url) {
    fetchMetaData(url);
  }
}
console.log("twitter meta")
console.log(metadata)
</script>
