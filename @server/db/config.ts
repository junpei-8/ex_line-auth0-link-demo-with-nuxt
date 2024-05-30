import type { Config } from 'drizzle-kit';
// NOTE: https://github.com/drizzle-team/drizzle-kit-mirror/issues/199 が解決され、Bun で実行できるようになるまでの暫定対応
//       Bun で実行できれば `import { $env } from '~~/^env';` として実行できる
import { $env } from '../../^env/shell';

const commonConfig = {
  schema: './@server/db/schemas/index.ts',
  out: './@server/db/migrations',
  verbose: true,
  strict: true,
} satisfies Partial<Config>;

/**
 * @see {@link https://orm.drizzle.team/kit-docs/overview} Documents
 */
export default ($env.WEB_DB_LOCAL_PATH
  ? {
      ...commonConfig,
      dialect: 'sqlite',
      dbCredentials: {
        url: $env.WEB_DB_LOCAL_PATH,
      },
    }
  : {
      ...commonConfig,
      dialect: 'sqlite',
      driver: 'd1',
      dbCredentials: {
        wranglerConfigPath: './wrangler.toml',
        dbName: $env.WEB_DB_NAME,
      },
    }) satisfies Config;
