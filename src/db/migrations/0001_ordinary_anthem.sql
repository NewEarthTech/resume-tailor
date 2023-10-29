ALTER TABLE "resume" ADD COLUMN "user_phone" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume" ADD CONSTRAINT "resume_user_phone_user_address_id_fk" FOREIGN KEY ("user_phone") REFERENCES "user_address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
