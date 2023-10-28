import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, jsonb, pgTable, serial, text } from "drizzle-orm/pg-core";

export const AppUserTable = pgTable("app_user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
});

export const UserEmailTable = pgTable("user_email", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => AppUserTable.id),
  email: text("email").notNull(),
});

export const UserAddressTable = pgTable("user_address", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => AppUserTable.id),
  google_location: jsonb("google_location"),
});

export const UserLinkTable = pgTable("user_link", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => AppUserTable.id),
  link: text("link").notNull(),
});

export const UserTitleTable = pgTable("user_title", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => AppUserTable.id),
  title: text("title").notNull(),
});

// Type Definitions
export type AppUser = InferSelectModel<typeof AppUserTable>;
export type NewAppUser = InferInsertModel<typeof AppUserTable>;

export type UserEmail = InferSelectModel<typeof UserEmailTable>;
export type NewUserEmail = InferInsertModel<typeof UserEmailTable>;

export type UserAddress = InferSelectModel<typeof UserAddressTable>;
export type NewUserAddress = InferInsertModel<typeof UserAddressTable>;

export type UserLink = InferSelectModel<typeof UserLinkTable>;
export type NewUserLink = InferInsertModel<typeof UserLinkTable>;

export type UserTitle = InferSelectModel<typeof UserTitleTable>;
export type NewUserTitle = InferInsertModel<typeof UserTitleTable>;
