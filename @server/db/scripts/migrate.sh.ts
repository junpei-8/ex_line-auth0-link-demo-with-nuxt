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

const dbName = import.meta.env.WEB_DB_NAME;
if (!dbName) {
  throw new Error('WEB_DB_NAME is not defined');
}

switch (options) {
  case 'dev':
  case 'preview':
    await $`wrangler d1 migrations apply ${dbName} --local`;
    break;

  case 'prod':
    await $`wrangler d1 migrations apply ${dbName} --remote`;
    break;

  default:
    throw new Error(
      'Invalid option, please provide one of the following: dev, prod, preview',
    );
}
