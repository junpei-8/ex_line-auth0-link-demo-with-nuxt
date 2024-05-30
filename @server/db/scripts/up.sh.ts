import { $, argv } from 'bun';

// Colorize the output
process.env.FORCE_COLOR = '1';

const args = argv.slice(2);

console.log('\n[web-db] Migration started');
await $`bun ${import.meta.dir}/migrate.sh.ts -- ${args}`;

console.log('\n[web-db] Studio started');
await $`bun ${import.meta.dir}/studio.sh.ts -- ${args}`;
