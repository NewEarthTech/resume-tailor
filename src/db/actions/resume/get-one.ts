"use server";

import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import {
  resumeView,
  UserAddressTable,
  UserEmailTable,
  UserPhoneTable,
  UsersTable,
} from "@/db/schema";
import { ResumeTable } from "@/db/schema/resume";
import { eq } from "drizzle-orm";
import { QueryBuilder } from "drizzle-orm/pg-core";

const qb = new QueryBuilder();

// const query = qb.select().from(UsersTable).where(eq(Users.name, "Dan"));
// const { sql, params } = query.toSQL();

export default async function getResume(id: string) {
  const resume = (
    await db
      .select({
        id: ResumeTable.id,
        resume_url: ResumeTable.custom_url,
        resume_email: UserEmailTable.email,
        //   user_id: UsersTable.id,
        // user_email: qb
        //   .select()
        //   .from(UserEmailTable)
        //   .where(eq(UserEmailTable.user_id, ResumeTable.user_id)),
        //   user_email: qb
        //     .select()
        //     .from(UserEmailTable)
        //     .where(eq(UserEmailTable.user_id, UsersTable.id)), //.from(UserEmailTable).where(eq(UserEmailTable.user_id, ResumeTable.user_id)))),
      })
      .from(ResumeTable)
      .where(eq(ResumeTable.id, id))
      .leftJoin(UserEmailTable, eq(UserEmailTable.id, ResumeTable.user_email))
  )[0]; // ) //   eq(UserAddressTable.user_id, ResumeTable.user_address), //   UserAddressTable, // ) //   eq(UserPhoneTable.user_id, ResumeTable.user_phone), //   UserPhoneTable, // .leftJoin(UserEmailTable, eq(UserEmailTable.id, ResumeTable.user_email)) // .leftJoin( // .leftJoin( // await db.select().from(resumeView).where(eq(resumeView.id, id)).limit(1)

  if (!resume) notFound();

  return resume;
}

export type GetResumeFunction = typeof getResume;
