import { JSDOM } from "jsdom";

export interface WebsiteMetadata {
  site_name: string;
  title: string;
  description: string;
  ogUrl: string;
  image: string;
  twitter_title: string;
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
      const twitter_title = document
        .querySelector('meta[property="twitter:title"]')
        ?.getAttribute("content")
        ?.trim();

      return {
        site_name: site_name ?? "",
        title: title ?? "",
        description: description ?? "",
        ogUrl: ogUrl ?? "",
        image: image ?? "",
        twitter_title: twitter_title ?? "",
      };
    } catch (error) {
      throw new Error(`Failed to fetch website metadata: ${String(error)}`);
    }
  }
}
