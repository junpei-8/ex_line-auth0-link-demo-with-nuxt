export const authProviderHeaderName = 'X-Auth-Provider-Type';

export const auth0AuthProviderType = 'auth0';
export const lineAuthProviderType = 'line';

export type AuthProviderType = (typeof authProviderTypes)[number];
export const authProviderTypes = [
  auth0AuthProviderType,
  lineAuthProviderType,
] as const;

export const authProviderMap = authProviderTypes.reduce(
  (acc, type) => ((acc[type] = true), acc),
  {} as Record<AuthProviderType, true>,
);
