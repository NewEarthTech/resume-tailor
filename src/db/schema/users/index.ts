import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export * from "./address";
export * from "./display-name";
export * from "./email";
export * from "./link";
export * from "./name";
export * from "./phone";
export * from "./title";

// Base Table
const UsersTable = pgTable("users", {
  id: text("id").primaryKey().notNull(),
});

// Schema for inserting - can be used to validate API requests
const insertUserSchema = createInsertSchema(UsersTable);

// Schema for selecting - can be used to validate API responses
const selectUserSchema = createSelectSchema(UsersTable);

// Type Definitions
type Users = InferSelectModel<typeof UsersTable>;
type NewUsers = InferInsertModel<typeof UsersTable>;

export {
  UsersTable,
  insertUserSchema,
  selectUserSchema,
  type Users,
  type NewUsers,
};
