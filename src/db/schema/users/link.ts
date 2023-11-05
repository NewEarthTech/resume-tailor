import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { UsersTable } from "./user";

const UserLinkTable = pgTable("user_link", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  link: text("link").notNull(),
});
const insertUserLinkSchema = createInsertSchema(UserLinkTable);
const selectUserLinkSchema = createSelectSchema(UserLinkTable);
type UserLink = InferSelectModel<typeof UserLinkTable>;
type NewUserLink = InferInsertModel<typeof UserLinkTable>;

export {
  UserLinkTable,
  insertUserLinkSchema,
  selectUserLinkSchema,
  type UserLink,
  type NewUserLink,
};
