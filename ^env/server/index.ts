import { initEnv } from '../env';

export const $env = initEnv(
  useRuntimeConfig().server as Record<string, unknown>,
);
