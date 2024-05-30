import type { BuildQueryResult, ExtractTablesWithRelations } from 'drizzle-orm';
import type * as schema from '~~/@server/db/schemas';
import type { DB } from '../db';

export type QueryableTable = DB['query'];
export type QueryableTableNames = keyof QueryableTable;

export type ExtractTableWithRelationsSchema = ExtractTablesWithRelations<
  typeof schema
>;

export type QueryConfig<T extends QueryableTableNames> = NonNullable<
  Parameters<QueryableTable[T]['findFirst' | 'findMany']>[0]
>;

export type QueryResult<
  K extends QueryableTableNames,
  S extends
    | true
    | Record<string, unknown>
    | Functionally<Record<string, unknown>> = true,
> = BuildQueryResult<
  ExtractTableWithRelationsSchema,
  ExtractTableWithRelationsSchema[K],
  S extends Functionally ? ReturnType<S> : S
>;

export type Query<
  TableName extends QueryableTableNames,
  ConfigGenerator extends Functionally<QueryConfig<TableName>>,
  ResponseGenerator extends Functionally = () => null,
> = {
  tableName: TableName;
  config: QueryConfig<TableName>;
  configResponse: ReturnType<ConfigGenerator>;
  result: QueryResult<TableName, ReturnType<ConfigGenerator>>;
  response: ReturnType<ResponseGenerator>;
};
