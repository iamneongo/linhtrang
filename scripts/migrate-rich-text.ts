import '../lib/loadEnv.ts';

import pg from 'pg';

import { normalizeRichText } from '../lib/rich-text.ts';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to migrate rich text content.');
}

const columns = [
  { table: 'categories', column: 'description' },
  { table: 'news', column: 'content' },
  { table: 'news', column: 'summary' },
  { table: 'products', column: 'description' },
  { table: 'projects', column: 'description' },
] as const;

const client = new pg.Client({ connectionString });

function quoteIdentifier(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}

async function main() {
  await client.connect();

  try {
    await client.query('begin');

    for (const entry of columns) {
      const typeResult = await client.query<{ data_type: string }>(
        `
          select data_type
          from information_schema.columns
          where table_schema = 'payload'
            and table_name = $1
            and column_name = $2
        `,
        [entry.table, entry.column],
      );

      const currentType = typeResult.rows[0]?.data_type;

      if (!currentType) {
        continue;
      }

      const tableName = quoteIdentifier(entry.table);
      const columnName = quoteIdentifier(entry.column);

      const rowsResult = await client.query<{ id: number | string; value: unknown }>(
        `select id, ${columnName} as value from payload.${tableName}`,
      );

      if (currentType !== 'jsonb') {
        await client.query(
          `alter table payload.${tableName} alter column ${columnName} type jsonb using to_jsonb(${columnName})`,
        );
      }

      for (const row of rowsResult.rows) {
        await client.query(
          `update payload.${tableName} set ${columnName} = $1::jsonb where id = $2`,
          [JSON.stringify(normalizeRichText(row.value)), row.id],
        );
      }
    }

    await client.query('commit');
    console.log('Rich text migration completed successfully.');
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

await main();
