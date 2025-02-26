import { JSDOM } from "jsdom";

export interface WebsiteMetadata {
  site_name?: string;
  title?: string;
  description?: string;
  ogUrl?: string;
  image?: string;
}

export class WebsiteMetadataService {
  public async getMetadata(url: string): Promise<WebsiteMetadata> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error();
      }

      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;

      const title = document.querySelector("title")?.textContent?.trim();
      const site_name = document
        .querySelector('meta[property="og:site_name"]')
        ?.getAttribute("content")
        ?.trim();
      const description = document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content")
        ?.trim();
      const ogUrl = document
        .querySelector('meta[property="og:url"]')
        ?.getAttribute("content")
        ?.trim();
      const image = document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content")
        ?.trim();

      return {
        site_name,
        title,
        description,
        ogUrl,
        image,
      };
    } catch (error) {
      throw new Error(`Failed to fetch website metadata: ${String(error)}`);
    }
  }
}
