CREATE TABLE IF NOT EXISTS "section_entry_detail" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_entry_id" uuid,
	"detail" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "section_entry_detail" ADD CONSTRAINT "section_entry_detail_section_entry_id_entry_id_fk" FOREIGN KEY ("section_entry_id") REFERENCES "entry"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
