"use server";

import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import {
  UserAddressTable,
  UserEmailTable,
  UserLinkTable,
  UserPhoneTable,
  UsersTable,
  UserTitleTable,
} from "@/db/schema";
import { ResumeSectionTable, ResumeTable } from "@/db/schema/resume";
import { eq } from "drizzle-orm";
import { QueryBuilder } from "drizzle-orm/pg-core";

// const query = qb.select().from(UsersTable).where(eq(Users.name, "Dan"));
// const { sql, params } = query.toSQL();

export default async function getResume(id: string) {
  const resume = (
    await db
      .select({
        id: ResumeTable.id,
        user_id: ResumeTable.user_id,
        custom_url: ResumeTable.custom_url,
        user_email: UserEmailTable.email,
        user_phone: UserPhoneTable.phone,
        user_address: ResumeTable.user_address,
        user_link: UserLinkTable.link,
        user_title: UserTitleTable.title,
        pdf_url: ResumeTable.pdf_url,
        sections: ResumeSectionTable,
      })
      .from(ResumeTable)
      .where(eq(ResumeTable.id, id))
      .leftJoin(UsersTable, eq(ResumeTable.user_id, UsersTable.id))
      .leftJoin(UserEmailTable, eq(UserEmailTable.id, ResumeTable.user_email))
      .leftJoin(UserPhoneTable, eq(UserPhoneTable.id, ResumeTable.user_phone))
      .leftJoin(UserLinkTable, eq(UserLinkTable.id, ResumeTable.user_link))
      .leftJoin(UserTitleTable, eq(UserTitleTable.id, ResumeTable.user_title))
      .leftJoin(
        ResumeSectionTable,
        eq(ResumeSectionTable.resume_id, ResumeTable.id),
      )
  )[0]; // ) //   eq(UserAddressTable.id, ResumeTable.user_address), //   UserAddressTable, // .leftJoin(
  // ) //   eq(UserAddressTable.user_id, ResumeTable.user_address), //   UserAddressTable, // ) //   eq(UserPhoneTable.user_id, ResumeTable.user_phone), //   UserPhoneTable, // .leftJoin(UserEmailTable, eq(UserEmailTable.id, ResumeTable.user_email)) // .leftJoin( // .leftJoin( // await db.select().from(resumeView).where(eq(resumeView.id, id)).limit(1)

  if (!resume) notFound();

  return resume;
}

export type GetResumeFunction = typeof getResume;
