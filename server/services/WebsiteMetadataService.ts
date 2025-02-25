import { JSDOM } from "jsdom";

export interface WebsiteMetadata {
  title?: string;
  description?: string;
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
      const description = document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content")
        ?.trim();

      return {
        title,
        description,
      };
    } catch (error) {
      throw new Error(`Failed to fetch website metadata: ${String(error)}`);
    }
  }
}
