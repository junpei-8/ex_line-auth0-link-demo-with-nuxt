import { eq } from 'drizzle-orm';
import { usersTable } from '~~/@server/db';
import type { DB } from '~~/@server/db';
import type { Query, QueryConfig } from '~~/@server/utils/query';

// NOTE: Query の情報は Client でも使用するため、共通の型定義として Query 型は毎回定義する
export type UsersQuery = Query<
  'usersTable',
  typeof createUsersQueryConfig,
  typeof createUsersQueryResponse
>;

export function createUsersQueryConfig() {
  return {
    columns: {
      id: true,
      name: true,
      picture: true,
    },
  } satisfies QueryConfig<'usersTable'>;
}

export function createUsersQueryResponse(users: UsersQuery['result']) {
  return users;
}

export function findUserById(db: DB, id: string) {
  return db.query.usersTable.findFirst({
    ...createUsersQueryConfig(),
    where: eq(usersTable.id, id),
  });
}
