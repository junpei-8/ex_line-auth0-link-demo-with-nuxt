import { alias } from './[core]/configs/alias';
import { excludePages } from './[core]/configs/page';
import { routeRules } from './[core]/configs/router';
import { uppercaseAlphabets } from './[core]/utils/alphabets';
import { $env } from './^env/client';

/**
 * @see {@link https://nuxt.com/docs/api/configuration/nuxt-config} Documents
 */
export default defineNuxtConfig({
  srcDir: '@client/',
  serverDir: '@server/',

  routeRules,

  modules: ['@vueuse/nuxt', '@pinia/nuxt', 'nitro-cloudflare-dev'],

  hooks: {
    'pages:extend': (pages) => excludePages([/\/_\//], pages),
  },

  imports: {
    dirs: [
      './stores/**',
      './composables/**',
      './layouts/**/stores/**',
      './layouts/**/composables/**',
    ],
  },

  components: {
    dirs: ['./components', './layouts/**/components'],
  },

  vite: {
    define: { $env },
    envPrefix: uppercaseAlphabets,
  },

  alias,
  typescript: {
    tsConfig: {
      include: ['../^env/client'],
      exclude: ['../^env/server'],
    },
  },

  nitro: {
    ignore: ['**/_/**/*'],
    alias,

    runtimeConfig: {
      server: $env as unknown as Record<string, string>,
    },

    typescript: {
      tsConfig: {
        include: ['../^env/server'],
        exclude: ['../^env/client', '../@client'],
      },
    },
  },

  devtools: { enabled: true },

  experimental: {
    typedPages: true,
  },
});
