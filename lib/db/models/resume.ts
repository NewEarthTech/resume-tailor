import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

import {
  AppUserTable,
  UserAddressTable,
  UserEmailTable,
  UserLinkTable,
  UserTitleTable,
} from "./app-user";

export const ResumeTable = pgTable("resume", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => AppUserTable.id),
  custom_url: text("custom_url"),
  user_email: integer("user_email").references(() => UserEmailTable.id),
  user_address: integer("user_address").references(() => UserAddressTable.id),
  user_link: integer("user_link").references(() => UserLinkTable.id),
  user_title: integer("user_title").references(() => UserTitleTable.id),
  pdf_url: text("pdf_url"),
});

export const SectionTable = pgTable("section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  layout: text("layout", { enum: ["row", "grid", "block", "list"] }).notNull(),
});

export const ResumeSectionTable = pgTable("resume_section", {
  id: serial("id").primaryKey(),
  resume_id: integer("resume_id").references(() => ResumeTable.id),
  section_id: integer("section_id").references(() => SectionTable.id),
});

export const EntryTable = pgTable("entry", {
  id: serial("id").primaryKey(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  include: boolean("include").notNull(),
});

export const SectionEntryTable = pgTable("section_entry", {
  id: serial("id").primaryKey(),
  section_id: integer("section_id").references(() => SectionTable.id),
  entry_id: integer("entry_id").references(() => EntryTable.id),
});

export const FieldTable = pgTable("field", {
  id: serial("id").primaryKey(),
  input_type: text("input_type", {
    enum: ["select", "textarea", "text", "date"],
  }).notNull(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  label: text("label").notNull(),
});

export const EntryFieldTable = pgTable("entry_field", {
  id: serial("id").primaryKey(),
  entry_id: integer("entry_id").references(() => EntryTable.id),
  field_id: integer("field_id").references(() => FieldTable.id),
});

export type Resume = InferSelectModel<typeof ResumeTable>;
export type NewResume = InferInsertModel<typeof ResumeTable>;

export type Section = InferSelectModel<typeof SectionTable>;
export type NewSection = InferInsertModel<typeof SectionTable>;

export type ResumeSection = InferSelectModel<typeof ResumeSectionTable>;
export type NewResumeSection = InferInsertModel<typeof ResumeSectionTable>;

export type Entry = InferSelectModel<typeof EntryTable>;
export type NewEntry = InferInsertModel<typeof EntryTable>;

export type SectionEntry = InferSelectModel<typeof SectionEntryTable>;
export type NewSectionEntry = InferInsertModel<typeof SectionEntryTable>;

export type Field = InferSelectModel<typeof FieldTable>;
export type NewField = InferInsertModel<typeof FieldTable>;

export type EntryField = InferSelectModel<typeof EntryFieldTable>;
export type NewEntryField = InferInsertModel<typeof EntryFieldTable>;
