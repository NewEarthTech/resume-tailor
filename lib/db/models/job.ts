import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { date, index, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { FieldTable, ResumeTable } from "./resume";

export const JobTable = pgTable(
  "job",
  {
    id: uuid("id").primaryKey(),
    link: text("link").notNull(),
    apply_link: text("apply_link").notNull(),
    title: text("title").notNull(),
    company: text("company").notNull(),
    company_link: text("company_link").notNull(),
    company_img_link: text("company_img_link").notNull(),
    place: text("place").notNull(),
    description: text("description").notNull(),
    description_html: text("description_html").notNull(),
    date: date("date").notNull(),
    insights: text("insights").notNull(),
  },
  (table) => {
    return {
      titleIdx: index("title_idx").on(table.title),
      companyIdx: index("company_idx").on(table.company),
      descriptionIdx: index("description_idx").on(table.description),
      dateIdx: index("date_idx").on(table.date),
      placeIdx: index("place_idx").on(table.place),
    };
  },
);

export const JobFieldTable = pgTable("job_field", {
  id: uuid("id").primaryKey(),
  job_id: uuid("job_id").references(() => JobTable.id),
  field_id: uuid("field_id").references(() => FieldTable.id),
});

export const JobResumeTable = pgTable("job_resume", {
  id: uuid("id").primaryKey(),
  job_id: uuid("job_id").references(() => JobTable.id),
  resume_id: uuid("resume_id").references(() => ResumeTable.id),
});

export type Job = InferSelectModel<typeof JobTable>;
export type NewJob = InferInsertModel<typeof JobTable>;

export type JobField = InferSelectModel<typeof JobFieldTable>;
export type NewJobField = InferInsertModel<typeof JobFieldTable>;

export type JobResume = InferSelectModel<typeof JobResumeTable>;
export type NewJobResume = InferInsertModel<typeof JobResumeTable>;
