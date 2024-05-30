import { initializeDb } from '../db';
import type { DB } from '../db';

declare module 'h3' {
  interface H3EventContext {
    db: DB;
  }
}

let client: DB | null;

export default defineEventHandler((event) => {
  if (!event.context.cloudflare) return;

  const { DB } = event.context.cloudflare.env as { DB: D1Database };

  if (!client) {
    client = initializeDb(DB);
  }

  event.context.db = client;
});
