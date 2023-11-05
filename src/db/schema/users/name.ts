import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { UsersTable } from ".";

const UserNameTable = pgTable("user_name", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  name: text("name").notNull(),
});

const insertUserNameSchema = createInsertSchema(UserNameTable);
const selectUserNameSchema = createSelectSchema(UserNameTable);

type UserName = InferSelectModel<typeof UserNameTable>;
type NewUserName = InferInsertModel<typeof UserNameTable>;

export {
  UserNameTable,
  insertUserNameSchema,
  selectUserNameSchema,
  type UserName,
  type NewUserName,
};
