import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  date,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { include, title } from "../../../types/index";
import { FieldTable } from "./field";

const EntryTable = pgTable("entry", {
  id: uuid("id").primaryKey(),
  include,
  title,
  entity: varchar("entity").unique(),
  summary: text("summary"),
  start_date: date("start_date"),
  end_date: date("end_date"),
});

const insertEntrySchema = createInsertSchema(EntryTable);
const selectEntrySchema = createSelectSchema(EntryTable);

type Entry = InferSelectModel<typeof EntryTable>;
type NewEntry = InferInsertModel<typeof EntryTable>;

const EntryDetailTable = pgTable("section_entry_detail", {
  id: uuid("id").primaryKey(),
  section_entry_id: uuid("section_entry_id").references(() => EntryTable.id),
  detail: text("detail").notNull(),
});

const insertEntryDetailSchema = createInsertSchema(EntryDetailTable);
const selectEntryDetailSchema = createSelectSchema(EntryDetailTable);

type EntryDetail = InferSelectModel<typeof EntryDetailTable>;
type NewEntryDetail = InferInsertModel<typeof EntryDetailTable>;

export {
  EntryDetailTable,
  insertEntryDetailSchema,
  selectEntryDetailSchema,
  type EntryDetail,
  type NewEntryDetail,
};

export {
  EntryTable,
  insertEntrySchema,
  selectEntrySchema,
  type Entry,
  type NewEntry,
};

const EntryFieldTable = pgTable("entry_field", {
  id: uuid("id").primaryKey(),
  entry_id: uuid("entry_id").references(() => EntryTable.id),
  field_id: uuid("field_id").references(() => FieldTable.id),
});

const insertEntryFieldSchema = createInsertSchema(EntryFieldTable);
const selectEntryFieldSchema = createSelectSchema(EntryFieldTable);

type EntryField = InferSelectModel<typeof EntryFieldTable>;
type NewEntryField = InferInsertModel<typeof EntryFieldTable>;

export {
  EntryFieldTable,
  insertEntryFieldSchema,
  selectEntryFieldSchema,
  type EntryField,
  type NewEntryField,
};

export * from "./field";
