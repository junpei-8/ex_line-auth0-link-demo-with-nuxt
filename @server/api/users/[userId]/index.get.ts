import { createUsersQueryResponse, findUserById } from '../_/query';
import { upsertUserProviderAsync } from './providers/_/mutation';

/**
 * 認証済みユーザーを取得する API
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
});
