import { createUsersQueryResponse, findUserById } from '../_/query';
import {
  upsertUserProvider,
  upsertUserProviderAsync,
} from './providers/_/mutation';

/**
 * 認証済みユーザーを取得する API
 *
 * Line Token からの流入の場合は認証情報をもとにアカウントを作成する
 */
export default defineEventHandler(async (event) => {
  const db = event.context.db;

  const auth = await getAuth(event);

  const userId = getMyLikelyParam(event, auth, 'userId');

  const user = await findUserById(db, userId);

  if (!user) {
    throw createError({ status: 404, statusMessage: 'User not found' });
  }

  upsertUserProviderAsync(db, userId, auth);

  return createUsersQueryResponse(user);

  // try {
  //   // Response を返却する
  //   return createUsersQueryResponse(user);

  //   // ↓ Response 後に行う処理
  // } finally {
  //   // レスポンス返却後 Auth0 のユーザープロバイダー情報を更新
  //   // NOTE: Provider は基本的に Client 側へ返却してはいけないため、User 返却時に同期している必要性が低いと判断してレスポンス後に処理する
  //   // NOTE: Get の処理時に実行している理由としては、Email などの情報が変更されている可能性があるため（Auth0 の外部連携の仕様に寄せた）
  //   // upsertUserProvider(db, userId, auth);
  // }
});
