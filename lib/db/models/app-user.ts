import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, jsonb, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const AppUserTable = pgTable("app_user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
});

const UserEmailTable = pgTable("user_email", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => AppUserTable.id),
  email: text("email").notNull(),
});

const UserAddressTable = pgTable("user_address", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => AppUserTable.id),
  google_location: jsonb("google_location"),
});

const UserLinkTable = pgTable("user_link", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => AppUserTable.id),
  link: text("link").notNull(),
});

const UserTitleTable = pgTable("user_title", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => AppUserTable.id),
  title: text("title").notNull(),
});

// Schema for inserting a user - can be used to validate API requests
const insertUserSchema = createInsertSchema(AppUserTable);

// Schema for selecting a user - can be used to validate API responses
const selectUserSchema = createSelectSchema(AppUserTable);

// Type Definitions
type AppUser = InferSelectModel<typeof AppUserTable>;
type NewAppUser = InferInsertModel<typeof AppUserTable>;

type UserEmail = InferSelectModel<typeof UserEmailTable>;
type NewUserEmail = InferInsertModel<typeof UserEmailTable>;

type UserAddress = InferSelectModel<typeof UserAddressTable>;
type NewUserAddress = InferInsertModel<typeof UserAddressTable>;

type UserLink = InferSelectModel<typeof UserLinkTable>;
type NewUserLink = InferInsertModel<typeof UserLinkTable>;

type UserTitle = InferSelectModel<typeof UserTitleTable>;
type NewUserTitle = InferInsertModel<typeof UserTitleTable>;

export {
  AppUserTable,
  UserEmailTable,
  UserAddressTable,
  UserLinkTable,
  UserTitleTable,
  insertUserSchema,
  selectUserSchema,
  type AppUser,
  type NewAppUser,
  type UserEmail,
  type NewUserEmail,
  type UserAddress,
  type NewUserAddress,
  type UserLink,
  type NewUserLink,
  type UserTitle,
  type NewUserTitle,
};
