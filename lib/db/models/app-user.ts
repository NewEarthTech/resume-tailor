import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, jsonb, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
});

const UserEmailTable = pgTable("user_email", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => UsersTable.id),
  email: text("email").notNull(),
});

const UserAddressTable = pgTable("user_address", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => UsersTable.id),
  google_location: jsonb("google_location"),
});

const UserLinkTable = pgTable("user_link", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => UsersTable.id),
  link: text("link").notNull(),
});

const UserTitleTable = pgTable("user_title", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => UsersTable.id),
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
