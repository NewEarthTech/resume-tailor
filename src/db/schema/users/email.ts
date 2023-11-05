import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { UsersTable } from ".";

const UserEmailTable = pgTable("user_email", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  email: text("email").notNull(),
});
const insertUserEmailSchema = createInsertSchema(UserEmailTable);
const selectUserEmailSchema = createSelectSchema(UserEmailTable);
type UserEmail = InferSelectModel<typeof UserEmailTable>;
type NewUserEmail = InferInsertModel<typeof UserEmailTable>;

export {
  UserEmailTable,
  insertUserEmailSchema,
  selectUserEmailSchema,
  type UserEmail,
  type NewUserEmail,
};
