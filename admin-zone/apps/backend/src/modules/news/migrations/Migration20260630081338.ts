import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260630081338 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "news" ("id" text not null, "title" text not null, "image_url" text null, "date" text null, "author" text null, "summary" text null, "content" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "news_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_news_deleted_at" ON "news" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "news" cascade;`);
  }

}
