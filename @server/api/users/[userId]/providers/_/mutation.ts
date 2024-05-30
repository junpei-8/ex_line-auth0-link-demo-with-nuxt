import { usersProviders } from '~~/@server/db';
import type { DB } from '~~/@server/db';

export function upsertUserProvider(db: DB, injectorId: string, auth: Auth) {
  return db
    .insert(usersProviders)
    .values({
      injectorId,
      type: auth.provider_type,
      sub: auth.sub,
      email: auth.email,
    })
    .onConflictDoUpdate({
      set: {
        sub: auth.sub,
        email: auth.email,
      },
      target: [
        // `inject_id` と `type` は複合ユニーク
        usersProviders.injectorId,
        usersProviders.type,
      ],
    });
}

function defaultOnReject(error: Error) {
  console.error('[Failed to upsert user provider]\n', error);
}
export function upsertUserProviderAsync(
  db: DB,
  injectorId: string,
  auth: Auth,
  { onReject = defaultOnReject }: { onReject?: (error: Error) => void } = {},
) {
  return upsertUserProvider(db, injectorId, auth).catch(onReject);
}
