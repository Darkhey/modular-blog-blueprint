import { createServer } from 'vite';
import type { StaticPost } from '../src/lib/staticContent';

// Vite resolves the same aliases and asset imports as the client, without a second application build.
export async function loadLocalPosts(): Promise<StaticPost[]> {
  const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', mode: 'production' });
  try {
    const module = await server.ssrLoadModule('/src/data/mockBlogPosts.ts');
    return module.mockBlogPosts;
  } finally {
    await server.close();
  }
}