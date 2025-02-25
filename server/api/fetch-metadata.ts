import { WebsiteMetadataService } from "~/server/services/WebsiteMetadataService";

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);

  if (!url || typeof url !== "string") {
    throw new Error("missing or invalid url");
  }

  try {
    const service = new WebsiteMetadataService();
    const metadata = await service.getMetadata(url);

    return {
      success: true,
      data: metadata,
    };
  } catch (error) {
    throw new Error(String(error));
  }
});
