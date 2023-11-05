import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { UsersTable } from "./user";

const UserPhoneTable = pgTable("user_address", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  google_location: jsonb("google_location"),
});

const insertUserPhoneSchema = createInsertSchema(UserPhoneTable);
const selectUserPhoneSchema = createSelectSchema(UserPhoneTable);

type UserPhone = InferSelectModel<typeof UserPhoneTable>;
type NewUserPhone = InferInsertModel<typeof UserPhoneTable>;

export {
  UserPhoneTable,
  insertUserPhoneSchema,
  selectUserPhoneSchema,
  type UserPhone,
  type NewUserPhone,
};
