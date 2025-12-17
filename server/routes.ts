import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.get("/api/books/featured", async (req, res) => {
    try {
      const books = await storage.getFeaturedBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured books" });
    }
  });

  app.get("/api/books/:id", async (req, res) => {
    try {
      const book = await storage.getBook(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch book" });
    }
  });

  app.get("/api/books", async (req, res) => {
    try {
      const { category, search, sort, featured, limit, exclude } = req.query;
      
      const books = await storage.getBooks({
        category: category as string | undefined,
        search: search as string | undefined,
        sort: sort as 'popularity' | 'newest' | 'rating' | 'title' | undefined,
        featured: featured === 'true',
        limit: limit ? parseInt(limit as string) : undefined,
        exclude: exclude as string | undefined,
      });
      
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  });

  return httpServer;
}
