/// <reference types="../env.d.ts" />

declare module 'nitropack' {
  interface NitroRuntimeConfig {
    server: ImportMeta['env'];
  }
}

export {};
