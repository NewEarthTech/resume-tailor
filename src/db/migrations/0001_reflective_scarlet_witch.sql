ALTER TABLE "resume" ADD COLUMN "user_name" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume" ADD CONSTRAINT "resume_user_name_user_name_id_fk" FOREIGN KEY ("user_name") REFERENCES "user_name"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
