import { ref } from "vue";
import type { WebsiteMetadata } from "~/server/services/WebsiteMetadataService";

// interface MetaData {
//   site_name?: string;
//   title?: string;
//   description?: string;
//   ogUrl: string;
//   image?: string;
// }

export function useFetchMetaData() {
  const metadata = ref<WebsiteMetadata | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  async function fetchMetaData(url: string) {
    try {
      loading.value = true;
      error.value = null;
      metadata.value = null;

      const result = await $fetch<{
        success: boolean;
        data: WebsiteMetadata;
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
