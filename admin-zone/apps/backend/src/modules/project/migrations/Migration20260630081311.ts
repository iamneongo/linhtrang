import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260630081311 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "project" ("id" text not null, "title" text not null, "location" text null, "image_url" text null, "category" text null, "year" text null, "area" text null, "style" text null, "description" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "project_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_project_deleted_at" ON "project" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "project" cascade;`);
  }

}
