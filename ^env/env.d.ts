interface ImportMetaEnv {
  // Environment
  NODE_ENV: 'development' | 'production';

  // Web (Frontend + Backend)
  WEB_LIFF_ID: string;

  // Web Auth0
  WEB_AUTH0_DOMAIN: string;
  WEB_AUTH0_AUDIENCE: string;
  WEB_AUTH0_CLIENT_ID: string;

  // Web DB Studio
  WEB_DB_NAME: string;
  WEB_DB_LOCAL_PATH: string;

  // LINE Messaging API
  LINE_CHANNEL_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: Readonly<RemoveIndexSignature<ImportMetaEnv>>;
}
