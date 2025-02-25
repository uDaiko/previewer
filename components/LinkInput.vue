<template>
  <div>
    <input v-model="siteUrl" placeholder="Enter a site URL, e.g., https://example.com" />
    <button @click="handleFetch">Fetch Metadata</button>

    <div v-if="loading">Loading…</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="metadata">
      <h3>Title: {{ metadata.title }}</h3>
      <p>Description: {{ metadata.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFetchMetaData } from "~/composables/useFetchMetaData";

// A reactive field for the user-entered URL
const siteUrl = ref("");

// Pull in our composable
const { metadata, loading, error, fetchMetaData } = useFetchMetaData();

function handleFetch() {
  const url = siteUrl.value.trim();
  // If user forgot to type "https://", optionally prepend:
  if (url && !/^https?:\/\//i.test(url)) {
    fetchMetaData(`https://${url}`);
  } else if (url) {
    fetchMetaData(url);
  }
}
</script>
