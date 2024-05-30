import { Auth0Client } from '@auth0/auth0-spa-js';

export const isUnsetAuth0Env =
  !$env.WEB_AUTH0_DOMAIN ||
  !$env.WEB_AUTH0_CLIENT_ID ||
  !$env.WEB_AUTH0_AUDIENCE;

export const auth0 = import.meta.client
  ? new Auth0Client({
      domain: $env.WEB_AUTH0_DOMAIN,
      clientId: $env.WEB_AUTH0_CLIENT_ID,
      authorizationParams: {
        audience: $env.WEB_AUTH0_AUDIENCE,
      },
    })
  : null!;
