import { $, argv } from 'bun';

// Colorize the output
process.env.FORCE_COLOR = '1';

const args = argv.slice(2);

type Options = 'dev' | 'preview' | 'prod';
const options = args[0] as Options;
if (!options) {
  throw new Error(
    'Options is not defined, please provide one of the following: dev, prod, preview',
  );
}

const configFile = `./@server/db/config.ts`;

switch (options) {
  case 'dev':
  case 'preview': {
    const dbPath =
      await $`find ./.wrangler/state/v3/d1/miniflare-D1DatabaseObject -type f -name '*.sqlite' -print -quit`
        .text()
        .catch(() => null);

    if (!dbPath) {
      throw new Error('Database file is not found');
    }

    await $`WEB_DB_LOCAL_PATH=${dbPath.trim()} drizzle-kit studio --config "${configFile}"`;
    break;
  }

  case 'prod': {
    await $`drizzle-kit studio --config "${configFile}"`;
    break;
  }

  default: {
    throw new Error(
      'Invalid option, please provide one of the following: dev, prod, preview',
    );
  }
}
