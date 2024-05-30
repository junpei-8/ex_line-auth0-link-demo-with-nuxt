import type {
  PopupConfigOptions,
  PopupLoginOptions,
} from '@auth0/auth0-spa-js';
import liff from '@line/liff';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('/user', () => {
  const userResponse = useAsyncData(
    '/api/users',
    async () => {
      const headers = await getAuthHeader().catch(() => null);
      return headers ? $fetch('/api/users', { method: 'POST', headers }) : null;
    },
    { server: false, deep: false },
  );

  // ユーザー情報の結果
  const data = userResponse.data;

  // ユーザー情報の取得時のエラー
  const error = userResponse.error;

  // ユーザー情報の取得状態
  const status = userResponse.status;

  // ユーザー情報が取得中かどうか
  const isFetching = userResponse.pending;

  // ユーザー情報が取得中かどうかを表すが、キャッシュが存在する場合は取得中でも false になる
  const isLoading = ref(userResponse.pending);
  watch(
    [data, isFetching],
    ([data, isFetching]) => (isLoading.value = isFetching && !data),
    { flush: 'sync' },
  );

  // ユーザー情報を再取得する関数
  const refresh = userResponse.refresh;

  async function login(
    options?: PopupLoginOptions,
    config?: PopupConfigOptions,
  ) {
    try {
      // LIFF が使用可能な場合は LIFF でログインする
      if (shouldUseLiff) {
        await initializingLiff;
        liff.login();
        return;
      }

      // ↓ それ以外の場合は Auth0 でログインする

      // ポップアップと共にログインする
      await auth0.loginWithPopup(options, config);

      isFetching.value = true;
      if (!data.value) isLoading.value = true;

      // ログインをする
      const user = await $fetch('/api/users', {
        method: 'POST',
        headers: await getAuth0AuthHeader(),
      });

      data.value = user;

      return user;

      // ↓ ログイン処理でエラーが発生した時の処理
    } catch (error) {
      alert('ログインに失敗しました。');
      throw error;

      // ↓ ログイン処理が終了した時の処理
    } finally {
      isLoading.value = false;
      isFetching.value = false;
    }
  }

  async function logout() {
    try {
      isFetching.value = true;
      if (!data.value) isLoading.value = true;

      // LIFF のアクセストークンを削除する
      if (initializingLiff) {
        await initializingLiff;
        liff.logout();
      }

      // Auth0 からログアウトする（完了後はトップページへリダイレクトが走る）
      await auth0.logout({ logoutParams: { returnTo: location.origin } });

      // データをリセットする
      data.value = null;

      // ↓ ログアウト処理でエラーが発生した時の処理
    } catch (error) {
      alert('ログアウトに失敗しました。');
      throw error;

      // ↓ ログアウト処理が終了した時の処理
    } finally {
      isLoading.value = false;
      isFetching.value = false;
    }
  }

  return {
    data,
    error,
    status,
    isLoading,
    isFetching,
    refresh,

    login,
    logout,
  };
});
