import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { UsersTable } from ".";

const UserDisplayNameTable = pgTable("user_display_name", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  display_name: text("display_name").notNull(),
});

const insertUserDisplayNameSchema = createInsertSchema(UserDisplayNameTable);
const selectUserDisplayNameSchema = createSelectSchema(UserDisplayNameTable);

type UserDisplayName = InferSelectModel<typeof UserDisplayNameTable>;
type NewUserDisplayName = InferInsertModel<typeof UserDisplayNameTable>;

export {
  UserDisplayNameTable,
  insertUserDisplayNameSchema,
  selectUserDisplayNameSchema,
  type UserDisplayName,
  type NewUserDisplayName,
};
