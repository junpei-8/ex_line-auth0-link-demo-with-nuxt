import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schemas';

export { default as config } from './config';
export * from './schemas';

export type DB = ReturnType<typeof initializeDb>;
export function initializeDb(db: D1Database) {
  return drizzle(db, { schema });
}
