import { pgTable, text, varchar, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
});

export const books = pgTable("books", {
  id: varchar("id", { length: 50 }).primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description").notNull(),
  synopsis: text("synopsis"),
  coverUrl: text("cover_url").notNull(),
  categoryId: varchar("category_id", { length: 50 }).notNull(),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  popularity: integer("popularity").default(0),
  releaseYear: integer("release_year"),
  featured: boolean("featured").default(false),
  previewContent: text("preview_content"),
});

export const insertCategorySchema = createInsertSchema(categories);
export const insertBookSchema = createInsertSchema(books);

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Book = typeof books.$inferSelect;
export type InsertBook = z.infer<typeof insertBookSchema>;

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
