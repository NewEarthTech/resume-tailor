import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { UsersTable } from "./user";

const UserAddressTable = pgTable("user_address", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  google_location: jsonb("google_location").notNull(),
});

const insertUserAddressSchema = createInsertSchema(UserAddressTable);
const selectUserAddressSchema = createSelectSchema(UserAddressTable);

type UserAddress = InferSelectModel<typeof UserAddressTable>;
type NewUserAddress = InferInsertModel<typeof UserAddressTable>;

export {
  UserAddressTable,
  insertUserAddressSchema,
  selectUserAddressSchema,
  type UserAddress,
  type NewUserAddress,
};
