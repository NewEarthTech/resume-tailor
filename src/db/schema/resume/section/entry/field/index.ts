import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

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

// Schema for inserting a resume - can be used to validate API requests
const insertFieldSchema = createInsertSchema(FieldTable);

// Schema for selecting a Field - can be used to validate API responses
const selectFieldSchema = createSelectSchema(FieldTable);

type Field = InferSelectModel<typeof FieldTable>;
type NewField = InferInsertModel<typeof FieldTable>;

export {
  FieldTable,
  insertFieldSchema,
  selectFieldSchema,
  type Field,
  type NewField,
};
