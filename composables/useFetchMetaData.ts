import { ref } from "vue";

interface MetaData {
  site_name?: string;
  title?: string;
  description?: string;
  ogUrl?: string;
  image?: string;
}

export function useFetchMetaData() {
  const metadata = ref<MetaData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchMetaData(url: string) {
    try {
      loading.value = true;
      error.value = null;
      metadata.value = null;

      const result = await $fetch<{
        success: boolean;
        data: MetaData;
      }>(`/api/fetch-metadata?url=${url}`);

      metadata.value = result.data ?? {};
    } catch (err) {
      error.value = "Error fetching metadata.";
    } finally {
      loading.value = false;
    }
  }

  return {
    metadata,
    loading,
    error,
    fetchMetaData,
  };
}
