import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "payload"."media" (
      "id" serial PRIMARY KEY NOT NULL,
      "alt" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "url" varchar,
      "thumbnail_u_r_l" varchar,
      "filename" varchar,
      "mime_type" varchar,
      "filesize" numeric,
      "width" numeric,
      "height" numeric,
      "focal_x" numeric,
      "focal_y" numeric,
      "sizes_thumbnail_url" varchar,
      "sizes_thumbnail_width" numeric,
      "sizes_thumbnail_height" numeric,
      "sizes_thumbnail_mime_type" varchar,
      "sizes_thumbnail_filesize" numeric,
      "sizes_thumbnail_filename" varchar
    );

    ALTER TABLE "payload"."categories"
      ADD COLUMN IF NOT EXISTS "image_url_id" integer;
    ALTER TABLE "payload"."products"
      ADD COLUMN IF NOT EXISTS "image_url_id" integer;
    ALTER TABLE "payload"."projects"
      ADD COLUMN IF NOT EXISTS "image_url_id" integer;
    ALTER TABLE "payload"."news"
      ADD COLUMN IF NOT EXISTS "image_url_id" integer;
    ALTER TABLE "payload"."payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "media_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'categories_image_url_id_media_id_fk'
      ) THEN
        ALTER TABLE "payload"."categories"
          ADD CONSTRAINT "categories_image_url_id_media_id_fk"
          FOREIGN KEY ("image_url_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'products_image_url_id_media_id_fk'
      ) THEN
        ALTER TABLE "payload"."products"
          ADD CONSTRAINT "products_image_url_id_media_id_fk"
          FOREIGN KEY ("image_url_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'projects_image_url_id_media_id_fk'
      ) THEN
        ALTER TABLE "payload"."projects"
          ADD CONSTRAINT "projects_image_url_id_media_id_fk"
          FOREIGN KEY ("image_url_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'news_image_url_id_media_id_fk'
      ) THEN
        ALTER TABLE "payload"."news"
          ADD CONSTRAINT "news_image_url_id_media_id_fk"
          FOREIGN KEY ("image_url_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'payload_locked_documents_rels_media_fk'
      ) THEN
        ALTER TABLE "payload"."payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_media_fk"
          FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "payload"."media" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "payload"."media" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "payload"."media" USING btree ("filename");
    CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "payload"."media" USING btree ("sizes_thumbnail_filename");

    CREATE INDEX IF NOT EXISTS "categories_image_url_id_idx" ON "payload"."categories" USING btree ("image_url_id");
    CREATE INDEX IF NOT EXISTS "products_image_url_id_idx" ON "payload"."products" USING btree ("image_url_id");
    CREATE INDEX IF NOT EXISTS "projects_image_url_id_idx" ON "payload"."projects" USING btree ("image_url_id");
    CREATE INDEX IF NOT EXISTS "news_image_url_id_idx" ON "payload"."news" USING btree ("image_url_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("media_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "news_image_url_id_idx";
    DROP INDEX IF EXISTS "projects_image_url_id_idx";
    DROP INDEX IF EXISTS "products_image_url_id_idx";
    DROP INDEX IF EXISTS "categories_image_url_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_media_id_idx";
    DROP INDEX IF EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
    DROP INDEX IF EXISTS "media_filename_idx";
    DROP INDEX IF EXISTS "media_created_at_idx";
    DROP INDEX IF EXISTS "media_updated_at_idx";

    ALTER TABLE "payload"."news" DROP CONSTRAINT IF EXISTS "news_image_url_id_media_id_fk";
    ALTER TABLE "payload"."projects" DROP CONSTRAINT IF EXISTS "projects_image_url_id_media_id_fk";
    ALTER TABLE "payload"."products" DROP CONSTRAINT IF EXISTS "products_image_url_id_media_id_fk";
    ALTER TABLE "payload"."categories" DROP CONSTRAINT IF EXISTS "categories_image_url_id_media_id_fk";
    ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_media_fk";

    ALTER TABLE "payload"."news" DROP COLUMN IF EXISTS "image_url_id";
    ALTER TABLE "payload"."projects" DROP COLUMN IF EXISTS "image_url_id";
    ALTER TABLE "payload"."products" DROP COLUMN IF EXISTS "image_url_id";
    ALTER TABLE "payload"."categories" DROP COLUMN IF EXISTS "image_url_id";
    ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN IF EXISTS "media_id";

    DROP TABLE IF EXISTS "payload"."media" CASCADE;
  `);
}
