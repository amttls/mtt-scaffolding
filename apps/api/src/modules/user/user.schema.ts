import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const selectUsersSchema = createSelectSchema(users).openapi("User");

export const insertUserSchema = createInsertSchema(users, {
  username: (schema) => schema.username.min(1).max(100),
  email: (schema) => schema.email.min(1).max(100).email(),
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .openapi("CreateUser");

export const patchUserSchema = insertUserSchema.partial().openapi("UpdateUser");
