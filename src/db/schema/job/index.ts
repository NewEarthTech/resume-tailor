import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { date, index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  jsonSchema,
} from "drizzle-zod";

import { ResumeTable } from "../resume";
import { FieldTable } from "../resume/section/entry/field";

const JobTable = pgTable(
  "job",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    link: text("link"),
    apply_link: text("apply_link"),
    title: text("title"),
    company: text("company"),
    company_link: text("company_link"),
    company_img_link: text("company_img_link"),
    place: text("place"),
    description: text("description"),
    description_html: text("description_html"),
    date: date("date"),
    insights: text("insights"),
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

const JobFieldTable = pgTable("job_field", {
  id: uuid("id").primaryKey().defaultRandom(),
  job_id: uuid("job_id").references(() => JobTable.id),
  field_id: uuid("field_id").references(() => FieldTable.id),
});

const JobResumeTable = pgTable("job_resume", {
  id: uuid("id").primaryKey().defaultRandom(),
  job_id: uuid("job_id").references(() => JobTable.id),
  resume_id: uuid("resume_id").references(() => ResumeTable.id),
});

// Schema for inserting a job - can be used to validate API requests
const insertJobSchema = createInsertSchema(JobTable, {
  link: (schema) => schema.link.url().optional(),
  apply_link: (schema) => schema.apply_link.url().optional(),
  company_link: (schema) => schema.company_link.url().optional(),
  company_img_link: (schema) => schema.company_img_link.url().optional(),
});

// Schema for selecting a job - can be used to validate API responses
const selectJobSchema = createSelectSchema(JobTable);

// Type Definitions
type Job = InferSelectModel<typeof JobTable>;
type NewJob = InferInsertModel<typeof JobTable>;

type JobField = InferSelectModel<typeof JobFieldTable>;
type NewJobField = InferInsertModel<typeof JobFieldTable>;

type JobResume = InferSelectModel<typeof JobResumeTable>;
type NewJobResume = InferInsertModel<typeof JobResumeTable>;

export {
  JobTable,
  JobFieldTable,
  JobResumeTable,
  insertJobSchema,
  selectJobSchema,
  type Job,
  type NewJob,
  type JobField,
  type NewJobField,
  type JobResume,
  type NewJobResume,
};
