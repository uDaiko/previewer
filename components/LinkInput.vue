<template>
  <div class="flex flex-col items-center h-screen bg-gray-100">
    <div class="flex flex-col items-center gap-4 pt-8">
      <input v-model="siteLink" placeholder="Enter a site URL" @keyup.enter="handleFetch"
        class="p-3 w-72 border border-gray-300 rounded-md text-lg" />
      <button @click="handleFetch" class="p-3 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600">
        Create Preview
      </button>
    </div>

    <div v-if="loading" class="text-xl text-center mt-8">Loading…</div>
    <div v-else-if="error" class="text-xl text-center mt-8 text-red-500">{{ error }}</div>
    <div v-else-if="metadata" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- <XPreview :metadata="metadata" /> -->
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
</script>
