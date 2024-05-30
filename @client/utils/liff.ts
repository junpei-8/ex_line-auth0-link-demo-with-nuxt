import liff from '@line/liff';

export const shouldUseLiff =
  import.meta.client && $env.WEB_LIFF_ID && liff.isInClient();

export const initializingLiff = shouldUseLiff
  ? liff.init({ liffId: $env.WEB_LIFF_ID })
  : null;

initializingLiff?.then(() => {
  // LIFF アプリで未ログインの場合、自動でログインが走る
  if (!liff.isLoggedIn()) {
    // NOTE: ログインが成功するとリロードが走る
    liff.login();
  }
});
