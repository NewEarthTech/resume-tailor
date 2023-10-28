import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

import { FieldTable, ResumeTable } from "./resume";

export const JobTable = pgTable("job", {
  id: serial("id").primaryKey(),
  link: text("link").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  company_link: text("company_link").notNull(),
  company_img_link: text("company_img_link").notNull(),
  place: text("place").notNull(),
  description_html: text("description_html").notNull(),
  date: date("date").notNull(),
  insights: text("insights").notNull(),
});

export const JobFieldTable = pgTable("job_field", {
  id: serial("id").primaryKey(),
  job_id: integer("job_id").references(() => JobTable.id),
  field_id: integer("field_id").references(() => FieldTable.id),
});

export const JobResumeTable = pgTable("job_resume", {
  id: serial("id").primaryKey(),
  job_id: integer("job_id").references(() => JobTable.id),
  resume_id: integer("resume_id").references(() => ResumeTable.id),
});

export type Job = InferSelectModel<typeof JobTable>;
export type NewJob = InferInsertModel<typeof JobTable>;

export type JobField = InferSelectModel<typeof JobFieldTable>;
export type NewJobField = InferInsertModel<typeof JobFieldTable>;

export type JobResume = InferSelectModel<typeof JobResumeTable>;
export type NewJobResume = InferInsertModel<typeof JobResumeTable>;
