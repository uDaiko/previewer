<template>
  <div>
    <input v-model="siteLink" placeholder="Enter a site URL" />
    <button @click="handleFetch">Create Preview</button>

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
