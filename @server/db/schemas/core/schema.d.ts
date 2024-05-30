import type { Relations as RelationsType } from 'drizzle-orm';
import type { SQLiteTable } from 'drizzle-orm/sqlite-core';

export interface DBSchema<
  TableName extends string,
  Table extends SQLiteTable,
  Relations extends RelationsType<TableName> | undefined = undefined,
> {
  table: Table;
  tableName: TableName;
  relations: Relations;
  insertModel: Table['$inferInsert'];
  selectModel: Table['$inferSelect'];
  updateModel: Partial<Table['$inferSelect']>;
}
