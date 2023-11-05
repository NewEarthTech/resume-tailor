import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { UsersTable } from ".";

const UserTitleTable = pgTable("user_title", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  title: text("title").notNull(),
});
const insertUserTitleSchema = createInsertSchema(UserTitleTable);
const selectUserTitleSchema = createSelectSchema(UserTitleTable);
type UserTitle = InferSelectModel<typeof UserTitleTable>;
type NewUserTitle = InferInsertModel<typeof UserTitleTable>;

export {
  UserTitleTable,
  insertUserTitleSchema,
  selectUserTitleSchema,
  type UserTitle,
  type NewUserTitle,
};
