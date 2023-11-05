import { UUID } from "crypto";
import { eq } from "drizzle-orm";
import {
  pgMaterializedView,
  pgTable,
  pgView,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { ResumeTable, UserEmailTable, UsersTable } from "..";

export const resumeView = pgMaterializedView("resume_view").as(
  (qb) =>
    qb
      .select({
        id: ResumeTable.id,
        custom_url: ResumeTable.custom_url,
        //   user_id: UsersTable.id,
        //   user_email: qb.select().from(UserEmailTable).where(eq(UserEmailTable.user_id, ResumeTable.user_id)))),
        //   user_email: qb
        //     .select()
        //     .from(UserEmailTable)
        //     .where(eq(UserEmailTable.user_id, UsersTable.id)), //.from(UserEmailTable).where(eq(UserEmailTable.user_id, ResumeTable.user_id)))),
      })
      .from(ResumeTable),
  // .leftJoin(UserEmailTable, eq(UserEmailTable.user_id, ResumeTable.user_id)),
);
