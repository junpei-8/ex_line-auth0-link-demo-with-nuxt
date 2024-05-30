import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { authProviderTypes } from '../../../[core]/utils/auth';
import { cuid } from './core/cuid';
import type { DBSchema } from './core/schema';
import { usersTable } from './users';

export type UserAuthProvidersSchema = DBSchema<
  typeof userAuthProvidersTableName,
  typeof userAuthProvidersTable,
  typeof userAuthProvidersRelations
>;

export const userAuthProvidersTableName = 'user_auth_providers';

export const userAuthProvidersTable = sqliteTable(
  userAuthProvidersTableName,
  {
    /**
     * @type {uuid}
     * @kind Primary Key
     */
    id: cuid('id').defaultRandom().primaryKey(),

    /**
     * プロバイダーを注入したユーザー ID
     *
     * @type {text}
     * @kind Data
     */
    injectorId: text('injector_id').notNull(),

    /**
     * プロバイダーの種類
     *
     * @type {'auth0' | 'line'}
     * @kind Data
     */
    type: text('type', { enum: authProviderTypes }).notNull(),

    /**
     * プロバイダーの ID
     *
     * @type {timestamp | null}
     * @kind Time
     */
    sub: text('sub').notNull(),

    /**
     * プロバイダーの Email
     *
     * @type {text}
     * @kind Data
     */
    email: text('email'),

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
  },
  (table) => ({
    /**
     * `injector_id` と `type` の組み合わせは一意とする
     *
     * - 複数のアカウントが同じプロバイダーを持つことはできない
     */
    InjectorIdAndTypeUx: uniqueIndex(
      `${userAuthProvidersTableName}_injector_id_and_type_ux`,
    ).on(table.injectorId, table.type),
  }),
);

export const userAuthProvidersRelations = relations(
  userAuthProvidersTable,
  ({ one }) => ({
    /**
     * このユーザープロバイダーテーブルはユーザーに対して複数紐づくことができる。(One to One)
     */
    injector: one(usersTable, {
      fields: [userAuthProvidersTable.injectorId],
      references: [usersTable.id],
    }),
  }),
);
