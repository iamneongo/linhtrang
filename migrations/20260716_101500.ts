import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "payload"."dealer_customers" (
      "id" serial PRIMARY KEY NOT NULL,
      "customer_code" varchar,
      "company_name" varchar NOT NULL,
      "contact_name" varchar NOT NULL,
      "phone" varchar NOT NULL,
      "email" varchar,
      "tax_code" varchar,
      "city" varchar,
      "address" varchar,
      "dealer_type" varchar DEFAULT 'showroom' NOT NULL,
      "tier" varchar DEFAULT 'standard' NOT NULL,
      "status" varchar DEFAULT 'lead' NOT NULL,
      "source" varchar,
      "contract_started_at" timestamp(3) with time zone,
      "contract_ended_at" timestamp(3) with time zone,
      "notes" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "payload"."loyal_customers" (
      "id" serial PRIMARY KEY NOT NULL,
      "customer_code" varchar,
      "full_name" varchar NOT NULL,
      "phone" varchar NOT NULL,
      "email" varchar,
      "birthday" timestamp(3) with time zone,
      "city" varchar,
      "address" varchar,
      "favorite_category" varchar,
      "membership_tier" varchar DEFAULT 'member' NOT NULL,
      "points" numeric DEFAULT 0 NOT NULL,
      "total_spent" numeric DEFAULT 0 NOT NULL,
      "status" varchar DEFAULT 'active' NOT NULL,
      "source" varchar,
      "last_purchase_at" timestamp(3) with time zone,
      "notes" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "dealer_customers_updated_at_idx" ON "payload"."dealer_customers" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "dealer_customers_created_at_idx" ON "payload"."dealer_customers" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "dealer_customers_customer_code_idx" ON "payload"."dealer_customers" USING btree ("customer_code");
    CREATE INDEX IF NOT EXISTS "dealer_customers_phone_idx" ON "payload"."dealer_customers" USING btree ("phone");
    CREATE INDEX IF NOT EXISTS "dealer_customers_status_idx" ON "payload"."dealer_customers" USING btree ("status");

    CREATE INDEX IF NOT EXISTS "loyal_customers_updated_at_idx" ON "payload"."loyal_customers" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "loyal_customers_created_at_idx" ON "payload"."loyal_customers" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "loyal_customers_customer_code_idx" ON "payload"."loyal_customers" USING btree ("customer_code");
    CREATE UNIQUE INDEX IF NOT EXISTS "loyal_customers_phone_idx" ON "payload"."loyal_customers" USING btree ("phone");
    CREATE INDEX IF NOT EXISTS "loyal_customers_status_idx" ON "payload"."loyal_customers" USING btree ("status");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "loyal_customers_status_idx";
    DROP INDEX IF EXISTS "loyal_customers_phone_idx";
    DROP INDEX IF EXISTS "loyal_customers_customer_code_idx";
    DROP INDEX IF EXISTS "loyal_customers_created_at_idx";
    DROP INDEX IF EXISTS "loyal_customers_updated_at_idx";

    DROP INDEX IF EXISTS "dealer_customers_status_idx";
    DROP INDEX IF EXISTS "dealer_customers_phone_idx";
    DROP INDEX IF EXISTS "dealer_customers_customer_code_idx";
    DROP INDEX IF EXISTS "dealer_customers_created_at_idx";
    DROP INDEX IF EXISTS "dealer_customers_updated_at_idx";

    DROP TABLE IF EXISTS "payload"."loyal_customers" CASCADE;
    DROP TABLE IF EXISTS "payload"."dealer_customers" CASCADE;
  `);
}
