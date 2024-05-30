import { usersTable } from '~~/@server/db';
import type { DB } from '~~/@server/db';

export function createUser(db: DB, id: string, auth: Auth) {
  const name = auth.nickname || auth.name;
  const picture = auth.picture;

  return db.insert(usersTable).values({
    id,
    name,
    picture,
  });
}
