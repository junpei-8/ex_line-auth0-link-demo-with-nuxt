import { upsertUserProviderAsync } from './[userId]/providers/_/mutation';
import { createUser } from './_/mutation';
import { createUsersQueryResponse, findUserById } from './_/query';

/**
 * ユーザーが存在しない場合は新規作成し、存在する場合は返却する API
 */
export default defineEventHandler(async (event) => {
  const db = event.context.db;

  const auth = await getAuth(event);

  const userId = getUserId(auth);

  let user = await findUserById(db, userId);

  // user が存在しない場合は新規作成
  if (!user) {
    // NOTE: このユーザー作成処理は `GET: /api/users/me` で生成されるユーザーと同じにする
    await createUser(db, userId, auth);

    // 新規作成した user を再取得
    user = (await findUserById(db, userId))!;
  }

  upsertUserProviderAsync(db, userId, auth);

  return createUsersQueryResponse(user);
});
