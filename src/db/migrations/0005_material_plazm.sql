CREATE TABLE IF NOT EXISTS "section_entry" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_id" uuid,
	"entry_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "section" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entry_field" (
	"id" uuid PRIMARY KEY NOT NULL,
	"entry_id" uuid,
	"field_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entry" (
	"id" uuid PRIMARY KEY NOT NULL,
	"include" boolean DEFAULT true,
	"title" varchar,
	"entity" varchar,
	"summary" text,
	"start_date" date,
	"end_date" date,
	CONSTRAINT "entry_entity_unique" UNIQUE("entity")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "field" (
	"id" uuid PRIMARY KEY NOT NULL,
	"input_type" text NOT NULL,
	"name" text NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "field" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "label_idx" ON "field" ("label");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "value_idx" ON "field" ("value");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "section_entry" ADD CONSTRAINT "section_entry_section_id_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "section_entry" ADD CONSTRAINT "section_entry_entry_id_entry_id_fk" FOREIGN KEY ("entry_id") REFERENCES "entry"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entry_field" ADD CONSTRAINT "entry_field_entry_id_entry_id_fk" FOREIGN KEY ("entry_id") REFERENCES "entry"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entry_field" ADD CONSTRAINT "entry_field_field_id_field_id_fk" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
