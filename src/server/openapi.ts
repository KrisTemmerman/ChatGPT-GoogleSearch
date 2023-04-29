import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from './api/root';



// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Chat GPT - Google Search API',
  description: 'Chat GPT Google Search API built using tRPC with Next.js',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000/api',
  docsUrl: 'https://github.com/krisdevs/chat-gpt-google-search',
 
});