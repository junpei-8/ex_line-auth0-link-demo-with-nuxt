import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { oauthId } from './core/oauth';
import type { DBSchema } from './core/schema';
import { usersProviders } from './user_providers';

export type UsersSchema = DBSchema<
  typeof usersTableName,
  typeof usersTable,
  typeof usersRelations
>;

export const usersTableName = 'users';

export const usersTable = sqliteTable(usersTableName, {
  /**
   * @type {oauth_id}
   * @kind Primary Key
   */
  id: oauthId('id').primaryKey(),

  /**
   * 名前
   *
   * @type {text | null}
   * @kind Data
   */
  name: text('name'),

  /**
   * 画像
   *
   * @type {text | null}
   * @kind Data
   */
  picture: text('picture'),

  /**
   * 作成した時間
   *
   * @type {timestamp}
   * @kind Time
   */
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),

  /**
   * 更新した時間
   *
   * 更新がない場合 NULL となる。
   *
   * @type {timestamp | null}
   * @kind Time
   */
  updatedAt: text('updated_at'),

  /**
   * 削除した時間
   *
   * 削除されていない場合 NULL となる。
   *
   * @type {timestamp | null}
   * @kind Time
   */
  deletedAt: text('deleted_at'),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  /**
   * このユーザーテーブルは企業に対して複数紐づくことができる。(One to Many)
   */
  providers: many(usersProviders),
}));
