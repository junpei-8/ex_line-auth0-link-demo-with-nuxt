/// <reference types="../../.nuxt/types/typed-router.d.ts" />

import type { NuxtConfig } from 'nuxt/schema';
import type { RouteNamedMap } from 'vue-router/auto/routes';

type RoutePaths = RouteNamedMap[keyof RouteNamedMap]['path'];
type RouteRules = NonNullable<NuxtConfig['routeRules']>;
type RouteRule = RouteRules[string];

export const routeRules = (() => {
  const ssg = {
    prerender: true,
  } satisfies RouteRule;

  const ssr = {
    ssr: true,
  } satisfies RouteRule;

  return {
    '/': ssg,
  } satisfies Record<ReplaceRouteParams<RoutePaths, `:${any}`, '*'>, RouteRule>;
})();
