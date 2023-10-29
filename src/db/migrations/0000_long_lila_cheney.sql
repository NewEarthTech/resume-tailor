CREATE TABLE IF NOT EXISTS "job_field" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid,
	"field_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_resume" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid,
	"resume_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link" text,
	"apply_link" text,
	"title" text,
	"company" text,
	"company_link" text,
	"company_img_link" text,
	"place" text,
	"description" text,
	"description_html" text,
	"date" date,
	"insights" text
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
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"include" boolean NOT NULL
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
CREATE TABLE IF NOT EXISTS "resume_section" (
	"id" uuid PRIMARY KEY NOT NULL,
	"resume_id" uuid,
	"section_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resume" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"custom_url" text,
	"user_email" uuid,
	"user_address" uuid,
	"user_link" uuid,
	"user_title" uuid,
	"pdf_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "section_entry" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_id" uuid,
	"entry_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "section" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"layout" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"google_location" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_email" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_link" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_title" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "job" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_idx" ON "job" ("company");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "description_idx" ON "job" ("description");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "date_idx" ON "job" ("date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "place_idx" ON "job" ("place");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "field" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "label_idx" ON "field" ("label");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "value_idx" ON "field" ("value");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_field" ADD CONSTRAINT "job_field_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_field" ADD CONSTRAINT "job_field_field_id_field_id_fk" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_resume" ADD CONSTRAINT "job_resume_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_resume" ADD CONSTRAINT "job_resume_resume_id_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE no action ON UPDATE no action;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume_section" ADD CONSTRAINT "resume_section_resume_id_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume_section" ADD CONSTRAINT "resume_section_section_id_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume" ADD CONSTRAINT "resume_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume" ADD CONSTRAINT "resume_user_email_user_email_id_fk" FOREIGN KEY ("user_email") REFERENCES "user_email"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume" ADD CONSTRAINT "resume_user_address_user_address_id_fk" FOREIGN KEY ("user_address") REFERENCES "user_address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume" ADD CONSTRAINT "resume_user_link_user_link_id_fk" FOREIGN KEY ("user_link") REFERENCES "user_link"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume" ADD CONSTRAINT "resume_user_title_user_title_id_fk" FOREIGN KEY ("user_title") REFERENCES "user_title"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
 ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_email" ADD CONSTRAINT "user_email_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_link" ADD CONSTRAINT "user_link_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_title" ADD CONSTRAINT "user_title_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
