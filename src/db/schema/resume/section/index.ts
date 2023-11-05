import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { EntryTable } from "./entry";

const SectionTable = pgTable("section", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
});

// Schema for inserting a resume - can be used to validate API requests
const insertSectionSchema = createInsertSchema(SectionTable);

// Schema for selecting a Section - can be used to validate API responses
const selectSectionSchema = createSelectSchema(SectionTable);

// Type Definitions
type Section = InferSelectModel<typeof SectionTable>;
type NewSection = InferInsertModel<typeof SectionTable>;

export {
  SectionTable,
  insertSectionSchema,
  selectSectionSchema,
  type Section,
  type NewSection,
};

const SectionEntryTable = pgTable("section_entry", {
  id: uuid("id").primaryKey(),
  section_id: uuid("section_id").references(() => SectionTable.id),
  entry_id: uuid("entry_id").references(() => EntryTable.id),
});

const insertResumeSectionEntrySchema = createInsertSchema(SectionEntryTable);

const selectResumeSectionEntrySchema = createSelectSchema(SectionEntryTable);

type SectionEntry = InferSelectModel<typeof SectionEntryTable>;
type NewSectionEntry = InferInsertModel<typeof SectionEntryTable>;

export {
  SectionEntryTable,
  insertResumeSectionEntrySchema,
  selectResumeSectionEntrySchema,
  type SectionEntry,
  type NewSectionEntry,
};

export * from "./entry";
