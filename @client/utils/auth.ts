import type { GetTokenSilentlyOptions } from '@auth0/auth0-spa-js';
import liff from '@line/liff';
import {
  auth0AuthProviderType,
  authProviderHeaderName,
  lineAuthProviderType,
} from '~~/[core]/utils/auth';

export interface GetAuth0AuthHeaderOptions
  extends StrictlyOmit<GetTokenSilentlyOptions, 'detailedResponse'> {}
export async function getAuth0AuthHeader(options?: GetAuth0AuthHeaderOptions) {
  if (isUnsetAuth0Env) {
    throw new Error('Unset Auth0 environment variables.');
  }

  const token = await auth0.getTokenSilently({
    ...options,
    detailedResponse: true,
  });

  return {
    Authorization: token.access_token,
    Authentication: token.id_token,
    [authProviderHeaderName]: auth0AuthProviderType,
  };
}

export async function getLineAuthHeader() {
  if (!shouldUseLiff) {
    throw new Error('LIFF is not enabled.');
  }

  await initializingLiff;

  const accessToken = liff.getAccessToken();
  const idToken = liff.getIDToken();

  if (!accessToken) {
    throw new Error('Failed to get "accessToken" from LIFF.');
  }

  return {
    Authorization: accessToken,
    Authentication: idToken!,
    [authProviderHeaderName]: lineAuthProviderType,
  };
}

/**
 * Auth0 または Line の認証情報を取得する。
 *
 * 判断基準は LIFF の使用有無で行う。
 *
 * @param   options
 * @returns
 */
export function getAuthHeader(
  options: {
    auth0?: GetAuth0AuthHeaderOptions;
  } = {},
) {
  return shouldUseLiff
    ? getLineAuthHeader()
    : getAuth0AuthHeader(options.auth0);
}
