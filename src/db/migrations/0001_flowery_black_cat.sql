ALTER TABLE "user_address" ADD COLUMN "phone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_address" DROP COLUMN IF EXISTS "google_location";