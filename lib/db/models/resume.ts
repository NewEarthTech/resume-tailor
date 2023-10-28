import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import {
  UserAddressTable,
  UserEmailTable,
  UserLinkTable,
  UsersTable,
  UserTitleTable,
} from "./app-user";

const ResumeTable = pgTable("resume", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => UsersTable.id),
  custom_url: text("custom_url"),
  user_email: integer("user_email").references(() => UserEmailTable.id),
  user_address: integer("user_address").references(() => UserAddressTable.id),
  user_link: integer("user_link").references(() => UserLinkTable.id),
  user_title: integer("user_title").references(() => UserTitleTable.id),
  pdf_url: text("pdf_url"),
});

const SectionTable = pgTable("section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  layout: text("layout", { enum: ["row", "grid", "block", "list"] }).notNull(),
});

const ResumeSectionTable = pgTable("resume_section", {
  id: serial("id").primaryKey(),
  resume_id: integer("resume_id").references(() => ResumeTable.id),
  section_id: integer("section_id").references(() => SectionTable.id),
});

const EntryTable = pgTable("entry", {
  id: serial("id").primaryKey(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  include: boolean("include").notNull(),
});

const SectionEntryTable = pgTable("section_entry", {
  id: serial("id").primaryKey(),
  section_id: integer("section_id").references(() => SectionTable.id),
  entry_id: integer("entry_id").references(() => EntryTable.id),
});

const FieldTable = pgTable(
  "field",
  {
    id: serial("id").primaryKey(),
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
  id: serial("id").primaryKey(),
  entry_id: integer("entry_id").references(() => EntryTable.id),
  field_id: integer("field_id").references(() => FieldTable.id),
});

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
  FieldTable,
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
  type Field,
  type NewField,
  type EntryField,
  type NewEntryField,
};
