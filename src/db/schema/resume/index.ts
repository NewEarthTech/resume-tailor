import { include, layout, title } from "@/db/types";
import { arrayContains, InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { Section } from "@/components/preview-pane/section";
import {
  UserAddressTable,
  UserEmailTable,
  UserLinkTable,
  UserPhoneTable,
  UsersTable,
  UserTitleTable,
} from "../users";

const ResumeTable = pgTable(
  "resume",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: text("user_id")
      .references(() => UsersTable.id)
      .notNull(),
    custom_url: text("custom_url"),
    user_email: uuid("user_email").references(() => UserEmailTable.id),
    user_phone: uuid("user_phone").references(() => UserPhoneTable.id),
    user_address: uuid("user_address").references(() => UserAddressTable.id),
    user_link: uuid("user_link").references(() => UserLinkTable.id),
    user_title: uuid("user_title").references(() => UserTitleTable.id),
    pdf_url: text("pdf_url"),
  },
  (table) => {
    return {
      custom_url: table.id,
    };
  },
);

const SectionTable = pgTable("section", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  layout,
});

const ResumeSectionTable = pgTable("resume_section", {
  id: uuid("id").primaryKey(),
  resume_id: uuid("resume_id").references(() => ResumeTable.id),
  section_id: uuid("section_id").references(() => SectionTable.id),
});

const EntryTable = pgTable("entry", {
  id: uuid("id").primaryKey(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  include: boolean("include").notNull(),
});

const SectionEntryTable = pgTable("section_entry", {
  id: uuid("id").primaryKey(),
  section_id: uuid("section_id").references(() => SectionTable.id),
  entry_id: uuid("entry_id").references(() => EntryTable.id),
  include,
  title,
  layout: layout.default("list"),
  entity: varchar("entity").unique(),
  summary: text("summary"),
  start_date: date("start_date"),
  end_date: date("end_date"),
});

const SectionEntryDetailTable = pgTable("section_entry_detail", {
  id: uuid("id").primaryKey(),
  section_entry_id: uuid("section_entry_id").references(
    () => SectionEntryTable.id,
  ),
  detail: text("detail").notNull(),
});

const FieldTable = pgTable(
  "field",
  {
    id: uuid("id").primaryKey(),
    input_type: text("input_type", {
      enum: ["select", "textarea", "text", "date"],
    }).notNull(),
    name: text("name").notNull(),
    label: text("label").notNull(),
    value: text("value").notNull(),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
      labelIdx: index("label_idx").on(table.label),
      valueIdx: index("value_idx").on(table.value),
    };
  },
);

const EntryFieldTable = pgTable("entry_field", {
  id: uuid("id").primaryKey(),
  entry_id: uuid("entry_id").references(() => EntryTable.id),
  field_id: uuid("field_id").references(() => FieldTable.id),
});

// Schema for inserting a resume - can be used to validate API requests
const insertResumeSchema = createInsertSchema(ResumeTable);

// Schema for selecting a resume - can be used to validate API responses
const selectResumeSchema = createSelectSchema(ResumeTable);

// Type Definitions
type Resume = InferSelectModel<typeof ResumeTable>;
type NewResume = InferInsertModel<typeof ResumeTable>;

type Section = InferSelectModel<typeof SectionTable>;
type NewSection = InferInsertModel<typeof SectionTable>;

type ResumeSection = InferSelectModel<typeof ResumeSectionTable>;
type NewResumeSection = InferInsertModel<typeof ResumeSectionTable>;

type Entry = InferSelectModel<typeof EntryTable>;
type NewEntry = InferInsertModel<typeof EntryTable>;

type SectionEntry = InferSelectModel<typeof SectionEntryTable>;
type NewSectionEntry = InferInsertModel<typeof SectionEntryTable>;

type SectionEntryDetail = InferSelectModel<typeof SectionEntryDetailTable>;
type NewSectionEntryDetail = InferInsertModel<typeof SectionEntryDetailTable>;

type Field = InferSelectModel<typeof FieldTable>;
type NewField = InferInsertModel<typeof FieldTable>;

type EntryField = InferSelectModel<typeof EntryFieldTable>;
type NewEntryField = InferInsertModel<typeof EntryFieldTable>;

export {
  ResumeTable,
  ResumeSectionTable,
  SectionTable,
  SectionEntryTable,
  EntryTable,
  EntryFieldTable,
  SectionEntryDetailTable,
  FieldTable,
  insertResumeSchema,
  selectResumeSchema,
  type Resume,
  type NewResume,
  type Section,
  type NewSection,
  type ResumeSection,
  type NewResumeSection,
  type Entry,
  type NewEntry,
  type SectionEntry,
  type NewSectionEntry,
  type SectionEntryDetail,
  type NewSectionEntryDetail,
  type Field,
  type NewField,
  type EntryField,
  type NewEntryField,
};
