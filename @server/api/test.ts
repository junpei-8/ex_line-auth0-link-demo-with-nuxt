import { eq } from 'drizzle-orm';
import { usersTable } from '../db';
import { createUsersQueryConfig } from './users/_/query';

/**
 * 認証済みユーザーを取得する API
 *
 * Line Token からの流入の場合は認証情報をもとにアカウントを作成する
 */
export default defineEventHandler(async (event) => {
  const db = event.context.db;

  const auth = await getAuth(event);

  const userId = getUserId(auth);

  const user = await db.query.usersTable.findFirst({
    ...createUsersQueryConfig(),
    with: {
      providers: {
        columns: {
          id: true,
        },
      },
    },
    where: eq(usersTable.id, userId),
  });

  return user;
});
