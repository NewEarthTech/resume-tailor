import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { jsonb, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const UsersTable = pgTable("users", {
  id: text("id").primaryKey().notNull(),
});

const UserEmailTable = pgTable("user_email", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  email: text("email").notNull(),
});

const UserAddressTable = pgTable("user_address", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  google_location: jsonb("google_location"),
});

const UserLinkTable = pgTable("user_link", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  link: text("link").notNull(),
});

const UserTitleTable = pgTable("user_title", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  title: text("title").notNull(),
});

// Schema for inserting a user - can be used to validate API requests
const insertUserSchema = createInsertSchema(UsersTable);

// Schema for selecting a user - can be used to validate API responses
const selectUserSchema = createSelectSchema(UsersTable);

// Type Definitions
type Users = InferSelectModel<typeof UsersTable>;
type NewUsers = InferInsertModel<typeof UsersTable>;

type UserEmail = InferSelectModel<typeof UserEmailTable>;
type NewUserEmail = InferInsertModel<typeof UserEmailTable>;

type UserAddress = InferSelectModel<typeof UserAddressTable>;
type NewUserAddress = InferInsertModel<typeof UserAddressTable>;

type UserLink = InferSelectModel<typeof UserLinkTable>;
type NewUserLink = InferInsertModel<typeof UserLinkTable>;

type UserTitle = InferSelectModel<typeof UserTitleTable>;
type NewUserTitle = InferInsertModel<typeof UserTitleTable>;

export {
  UsersTable,
  UserEmailTable,
  UserAddressTable,
  UserLinkTable,
  UserTitleTable,
  insertUserSchema,
  selectUserSchema,
  type Users,
  type NewUsers,
  type UserEmail,
  type NewUserEmail,
  type UserAddress,
  type NewUserAddress,
  type UserLink,
  type NewUserLink,
  type UserTitle,
  type NewUserTitle,
};
