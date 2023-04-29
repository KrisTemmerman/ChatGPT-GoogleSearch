import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface SearchInput {
  q: string;
}

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

type ResultItem = {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  cacheId?: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap?: Record<string, unknown>[];
};

type SearchRequest = {
  title: string;
  totalResults: string;
  searchTime: number;
  formattedSearchTime: string;
  formattedTotalResults: string;
};

type SearchQueries = {
  request: SearchRequest[];
  nextPage?: SearchRequest[];
};

type GoogleCustomSearchApiResponse = {
  kind: string;
  url: {
    type: string;
    template: string;
  };
  queries: SearchQueries;
  context: {
    title: string;
  };
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  items: ResultItem[];
};

const ResultSchema = z.object({
  title: z.string(),
  link: z.string(),
  snippet: z.string(),
});

export const searchRouter = createTRPCRouter({
  search: publicProcedure
    .meta({ openapi: { method: "GET", path: "/search" } })
    .input(z.object({ q: z.string() }))
    .output(z.object({ results: z.array(ResultSchema) }))
    .query(async ({ input }: { input: SearchInput }) => {
      const { q } = input;
      if (!q) {
        throw new Error("No query provided");
      }

      const API_KEY: string = process.env.GOOGLE_API_KEY ?? "";
      const CX: string = process.env.CUSTOM_SEARCH_ENGINE_ID ?? "";
      const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${q}`;
      const response: Response = await fetch(url);

      if (response.status === 200) {
        const data: GoogleCustomSearchApiResponse = await response.json();
        const items = data.items ?? [];
        console.log(data)
        const results: SearchResult[] = items.map((item: ResultItem) => ({
          title: item.title ?? "",
          link: item.link ?? "",
          snippet: item.snippet ?? "",
        }));
        return { results };
      } else {
        throw new Error("Error fetching search results");
      }
    }),
});
