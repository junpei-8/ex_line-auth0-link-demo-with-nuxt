import type { User as Auth0User } from '@auth0/auth0-spa-js';
import { createRemoteJWKSet, decodeJwt, jwtVerify } from 'jose';
import {
  auth0AuthProviderType,
  authProviderHeaderName,
  authProviderMap,
  authProviderTypes,
  lineAuthProviderType,
} from '~~/[core]/utils/auth';
import type { AuthProviderType } from '~~/[core]/utils/auth';
import { $env } from '~~/^env/server';

export type Auth = Auth0User & {
  sub: string;
  provider_type: AuthProviderType;
};
export type AuthEvent = {
  headers: { get: (key: string) => string | null };
};

/**
 * Auth0 の認証情報の JWK の鍵
 */
export const auth0JWKs = createRemoteJWKSet(
  new URL(`https://${$env.WEB_AUTH0_DOMAIN}/.well-known/jwks.json`),
  { cacheMaxAge: 86400000 /* 1日 */ },
);

/**
 * Auth0 の認証情報を検証する。
 *
 * @param   accessToken アクセストークン
 * @param   idToken     ID トークン
 * @returns             認証
 */
export function verifyAuth0Auth(accessToken: string, idToken?: string | null) {
  const verifying = jwtVerify(accessToken, auth0JWKs, {
    issuer: `https://${$env.WEB_AUTH0_DOMAIN}/`,
    audience: $env.WEB_AUTH0_AUDIENCE,
  });

  const token = idToken && (decodeJwt(idToken) as Auth);

  return verifying.then((result) => {
    const entry = token || (result.payload as Auth);
    entry.provider_type = auth0AuthProviderType;
    return entry;
  });
}

/**
 * Auth0 の認証情報を API の Event から取得し、検証した後取得する。
 *
 * @param   event API の Event
 * @returns       認証情報のペイロード
 */
export function getAuth0Auth(event: AuthEvent) {
  const authHeader = event.headers.get('Authorization');
  const idToken = event.headers.get('Authentication');

  if (!authHeader) {
    throw createError({
      status: 401,
      message: 'Authentication is required.',
    });
  }

  return verifyAuth0Auth(authHeader, idToken);
}

/**
 * Line の認証情報を検証する。
 *
 * @param   accessToken アクセストークン
 * @param   idToken     ID トークン
 * @returns             認証情報のペイロード
 */
export function verifyLineAuth(accessToken: string, idToken?: string | null) {
  const verifying = fetch(
    `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`,
  );

  const token = decodeJwt(idToken || accessToken) as Auth;

  return verifying.then(() => {
    token.provider_type = lineAuthProviderType;
    return token;
  });
}

/**
 * API の Event を元に Line の Auth 情報を取得し、検証した後取得する。
 *
 * @param   event API の Event
 * @returns       認証情報のペイロード
 */
export function getLineAuth(event: AuthEvent) {
  const accessToken = event.headers.get('Authorization');
  const idToken = event.headers.get('Authentication');

  if (!accessToken) {
    throw createError({
      status: 401,
      message: '"Authentication" Header is required.',
    });
  }

  return verifyLineAuth(accessToken, idToken);
}

/**
 * API の Event から認証の Provider Type を取得する。
 *
 * @param   event
 * @returns       Provider Type
 */
export function getAuthProviderType(event: AuthEvent) {
  const providerType = event.headers.get(
    authProviderHeaderName,
  ) as AuthProviderType | null;

  if (!providerType) {
    throw createError({
      status: 401,
      message: `"${authProviderHeaderName} Header is required.`,
    });
  }

  // プロバイダータイプが不正な場合はエラー
  if (!authProviderMap[providerType]) {
    throw createError({
      status: 401,
      message:
        `"${authProviderHeaderName}" Header is invalid.\n` +
        `Expected: ${authProviderTypes.map((type) => `"${type}"`).join(' or ')}\n`,
    });
  }

  return providerType;
}

/**
 * API の Event から認証情報を取得する。\
 * （処理の中で、Line のトークンなのか、Auth0 のトークンなのかを判定し、適切な方を取得する）
 *
 * @param   event API の Event
 * @returns       認証情報のペイロード
 */
export function getAuth(event: AuthEvent) {
  const authProviderType = getAuthProviderType(event);

  if (authProviderType === auth0AuthProviderType) {
    return getAuth0Auth(event);
  }

  if (authProviderType === lineAuthProviderType) {
    return getLineAuth(event);
  }

  return null as never;
}
