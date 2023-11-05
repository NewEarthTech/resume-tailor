import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { layout } from "../types/index";
import {
  UserAddressTable,
  UserEmailTable,
  UserLinkTable,
  UserNameTable,
  UserPhoneTable,
  UsersTable,
  UserTitleTable,
} from "../users";
import { SectionTable } from "./section";

const ResumeTable = pgTable("resume", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  custom_url: text("custom_url"),
  user_email: uuid("user_email").references(() => UserEmailTable.id),
  user_phone: uuid("user_phone").references(() => UserPhoneTable.id),
  user_address: uuid("user_address").references(() => UserAddressTable.id),
  user_name: uuid("user_name").references(() => UserNameTable.id),
  user_link: uuid("user_link").references(() => UserLinkTable.id),
  user_title: uuid("user_title").references(() => UserTitleTable.id),
  pdf_url: text("pdf_url"),
});

// Schema for inserting a resume - can be used to validate API requests
const insertResumeSchema = createInsertSchema(ResumeTable);

// Schema for selecting a resume - can be used to validate API responses
const selectResumeSchema = createSelectSchema(ResumeTable);

// Type Definitions
type Resume = InferSelectModel<typeof ResumeTable>;
type NewResume = InferInsertModel<typeof ResumeTable>;

export {
  ResumeTable,
  insertResumeSchema,
  selectResumeSchema,
  type Resume,
  type NewResume,
};

const ResumeSectionTable = pgTable("resume_section", {
  id: uuid("id").primaryKey(),
  resume_id: uuid("resume_id").references(() => ResumeTable.id),
  section_id: uuid("section_id").references(() => SectionTable.id),
  layout,
});

// Schema for inserting a resume - can be used to validate API requests
const insertResumeSectionSchema = createInsertSchema(ResumeSectionTable);

// Schema for selecting a resumeSection - can be used to validate API responses
const selectResumeSectionSchema = createSelectSchema(ResumeSectionTable);

// Type Definitions
type ResumeSection = InferSelectModel<typeof ResumeSectionTable>;
type NewResumeSection = InferInsertModel<typeof ResumeSectionTable>;

export {
  ResumeSectionTable,
  insertResumeSectionSchema,
  selectResumeSectionSchema,
  type ResumeSection,
  type NewResumeSection,
};

export * from "./section";
