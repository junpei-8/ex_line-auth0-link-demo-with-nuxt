import { text } from 'drizzle-orm/sqlite-core';

/**
 * @type    {auth0_id}
 * @param   name          カラム名
 * @returns      varchar(255)
 */
export function oauthId(name: string) {
  return text(name, { length: 255 });
}
