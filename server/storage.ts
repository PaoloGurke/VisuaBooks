import { type User, type InsertUser, type Book, type Category } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getBooks(options?: {
    category?: string;
    search?: string;
    sort?: 'popularity' | 'newest' | 'rating' | 'title';
    featured?: boolean;
    limit?: number;
    exclude?: string;
  }): Promise<Book[]>;
  getBook(id: string): Promise<Book | undefined>;
  getFeaturedBooks(): Promise<Book[]>;
  
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
}

const sampleCategories: Category[] = [
  { id: 'fiction', name: 'Fiction', description: 'Immerse yourself in captivating stories and imaginative worlds', imageUrl: '' },
  { id: 'non-fiction', name: 'Non-Fiction', description: 'Explore real-world knowledge and inspiring true stories', imageUrl: '' },
  { id: 'science', name: 'Science', description: 'Discover the wonders of the universe and natural world', imageUrl: '' },
  { id: 'fantasy', name: 'Fantasy', description: 'Enter magical realms filled with adventure and wonder', imageUrl: '' },
  { id: 'self-help', name: 'Self-Help', description: 'Transform your life with practical wisdom and guidance', imageUrl: '' },
];

const sampleBooks: Book[] = [
  {
    id: 'book-1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    synopsis: 'Nora Seed finds herself in the Midnight Library, where she can try out different versions of her life. Each book represents a different path she could have taken. As she tries each life, she discovers what truly makes life worth living.',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    categoryId: 'fiction',
    rating: 4.5,
    reviewCount: 12453,
    popularity: 98000,
    releaseYear: 2020,
    featured: true,
    previewContent: 'Chapter One\n\nNora Seed was not the kind of person who made a scene. Which is why when she opened the door to the Midnight Library, she did so quietly.\n\n---PAGE---\n\nThe library was vast. Infinitely vast. Row after row of books stretched into a soft grey mist. Each book was a different life she could have lived.\n\n---PAGE---\n\n"Between life and death there is a library," Mrs Elm told her. "And within that library, the shelves go on forever."'
  },
  {
    id: 'book-2',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving every day. Learn how tiny changes can lead to remarkable results.',
    synopsis: 'James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
    categoryId: 'self-help',
    rating: 4.8,
    reviewCount: 45678,
    popularity: 156000,
    releaseYear: 2018,
    featured: true,
    previewContent: 'Introduction\n\nThe fate of British Cycling changed one day in 2003. The organization had just hired Dave Brailsford as its new performance director.\n\n---PAGE---\n\nSmall habits don\'t add up. They compound. That\'s the power of atomic habits—regular practice or routines that are small and easy to do, yet incredibly powerful.\n\n---PAGE---\n\nThe 1% Rule: If you get one percent better each day for one year, you\'ll end up thirty-seven times better by the time you\'re done.'
  },
  {
    id: 'book-3',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    description: 'From the Big Bang to black holes, this classic work explores the nature of time and space in language anyone can understand.',
    synopsis: 'Stephen Hawking attempts to explain a range of subjects including black holes, the Big Bang, and the nature of time itself to the non-specialist reader.',
    coverUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=600&fit=crop',
    categoryId: 'science',
    rating: 4.6,
    reviewCount: 23456,
    popularity: 89000,
    releaseYear: 1988,
    featured: true,
    previewContent: 'Chapter 1: Our Picture of the Universe\n\nA well-known scientist once gave a public lecture on astronomy. He described how the earth orbits around the sun.\n\n---PAGE---\n\nThe universe has no beginning or end in time, and no boundary in space. It is self-contained. What place, then, for a creator?\n\n---PAGE---\n\nIf we find the answer to that, it would be the ultimate triumph of human reason—for then we would know the mind of God.'
  },
  {
    id: 'book-4',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    description: 'The riveting first-person narrative of a young man who grows to be the most notorious wizard his world has ever seen.',
    synopsis: 'Kvothe tells his own story—the story of a young man who becomes one of the most famous magicians his world has ever seen, known as a hero and a killer.',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop',
    categoryId: 'fantasy',
    rating: 4.7,
    reviewCount: 34567,
    popularity: 112000,
    releaseYear: 2007,
    featured: true,
    previewContent: 'Prologue: A Silence of Three Parts\n\nIt was night again. The Waystone Inn lay in silence, and it was a silence of three parts.\n\n---PAGE---\n\nThe most obvious part was a hollow, echoing quiet, made by things that were lacking. If there had been a wind, it would have sighed.\n\n---PAGE---\n\n"I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life."'
  },
  {
    id: 'book-5',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description: 'How did our species succeed in the battle for dominance? This groundbreaking book explores the history of humanity.',
    synopsis: 'From the cognitive revolution to the scientific revolution, Harari explores how biology and history have defined us and enhanced our understanding of what it means to be human.',
    coverUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop',
    categoryId: 'non-fiction',
    rating: 4.5,
    reviewCount: 56789,
    popularity: 145000,
    releaseYear: 2011,
    featured: true,
    previewContent: 'Part One: The Cognitive Revolution\n\nAbout 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang.\n\n---PAGE---\n\nAbout 70,000 years ago, organisms belonging to the species Homo sapiens started to form even more elaborate structures called cultures.\n\n---PAGE---\n\nThe most important thing to know about prehistoric humans is that they were insignificant animals with no more impact on their environment than gorillas.'
  },
  {
    id: 'book-6',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A masterpiece of the Jazz Age, this novel captures the decadence and idealism of 1920s America.',
    synopsis: 'Nick Carraway narrates the story of the mysterious Jay Gatsby and his obsession with the beautiful Daisy Buchanan in the summer of 1922.',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    categoryId: 'fiction',
    rating: 4.4,
    reviewCount: 67890,
    popularity: 134000,
    releaseYear: 1925,
    featured: false,
    previewContent: 'Chapter 1\n\nIn my younger and more vulnerable years my father gave me some advice that I\'ve been turning over in my mind ever since.\n\n---PAGE---\n\n"Whenever you feel like criticizing anyone," he told me, "just remember that all the people in this world haven\'t had the advantages that you\'ve had."\n\n---PAGE---\n\nAnd so with the sunshine and the great bursts of leaves growing on the trees, I had that familiar conviction that life was beginning over again with the summer.'
  },
  {
    id: 'book-7',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    description: 'Nobel laureate Daniel Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
    synopsis: 'Kahneman reveals how our minds are tripped up by error and prejudice, and gives practical techniques for slower, smarter thinking.',
    coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop',
    categoryId: 'self-help',
    rating: 4.5,
    reviewCount: 34567,
    popularity: 98000,
    releaseYear: 2011,
    featured: false,
    previewContent: 'Introduction\n\nEvery author, I suppose, has in mind a setting in which readers of his or her work could benefit from having read it.\n\n---PAGE---\n\nThe premise of this book is that it is easier to recognize other people\'s mistakes than our own.\n\n---PAGE---\n\nSystem 1 operates automatically and quickly, with little or no effort and no sense of voluntary control.'
  },
  {
    id: 'book-8',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life. His contentment is disturbed when the wizard Gandalf arrives.',
    synopsis: 'Follow Bilbo Baggins as he journeys with a group of dwarves to reclaim their mountain home from Smaug the dragon.',
    coverUrl: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&h=600&fit=crop',
    categoryId: 'fantasy',
    rating: 4.8,
    reviewCount: 89012,
    popularity: 167000,
    releaseYear: 1937,
    featured: false,
    previewContent: 'Chapter 1: An Unexpected Party\n\nIn a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell.\n\n---PAGE---\n\nThis hobbit was a very well-to-do hobbit, and his name was Baggins. The Bagginses had lived in the neighbourhood of The Hill for time out of mind.\n\n---PAGE---\n\n"Good Morning!" said Bilbo, and he meant it. The sun was shining, and the grass was very green.'
  },
  {
    id: 'book-9',
    title: 'Cosmos',
    author: 'Carl Sagan',
    description: 'With eloquence and passion, Carl Sagan takes us on a journey through space and time, exploring the universe and our place in it.',
    synopsis: 'A cosmic journey that covers the entire history of the universe and explores the relationship between human beings and the cosmos.',
    coverUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop',
    categoryId: 'science',
    rating: 4.7,
    reviewCount: 23456,
    popularity: 87000,
    releaseYear: 1980,
    featured: false,
    previewContent: 'Chapter 1: The Shores of the Cosmic Ocean\n\nThe Cosmos is all that is or ever was or ever will be. Our feeblest contemplations of the Cosmos stir us.\n\n---PAGE---\n\nWe are a way for the universe to know itself. Some part of our being knows this is where we came from.\n\n---PAGE---\n\nThe surface of the Earth is the shore of the cosmic ocean. On this shore, we\'ve learned most of what we know.'
  },
  {
    id: 'book-10',
    title: 'Educated',
    author: 'Tara Westover',
    description: 'A memoir about a young woman who leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    synopsis: 'Tara Westover recounts her journey from growing up in a strict and abusive household in rural Idaho to eventually earning a doctorate degree.',
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    categoryId: 'non-fiction',
    rating: 4.6,
    reviewCount: 45678,
    popularity: 123000,
    releaseYear: 2018,
    featured: false,
    previewContent: 'Part One\n\nI\'m standing on the red railway car that sits on a slope of the mountain. The hill is paved with wildflowers.\n\n---PAGE---\n\nI know this car by heart. I know the splintered floorboards, the rusted wheels, the way the car groans in the wind.\n\n---PAGE---\n\nMy strongest memory is not a memory. It\'s something I imagined, then believed. A memory.'
  },
  {
    id: 'book-11',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A witty and romantic novel about the proud Mr. Darcy and the prejudiced Elizabeth Bennet.',
    synopsis: 'The story follows the main character Elizabeth Bennet as she deals with issues of manners, upbringing, morality, and marriage in the society of the landed gentry of the British Regency.',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    categoryId: 'fiction',
    rating: 4.7,
    reviewCount: 78901,
    popularity: 145000,
    releaseYear: 1813,
    featured: false,
    previewContent: 'Chapter 1\n\nIt is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.\n\n---PAGE---\n\nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed.\n\n---PAGE---\n\n"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"'
  },
  {
    id: 'book-12',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    description: 'A guide to spiritual enlightenment that has touched millions of lives worldwide.',
    synopsis: 'Tolle presents a simple yet profound message that the key to enlightenment and happiness is to live in the present moment.',
    coverUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    categoryId: 'self-help',
    rating: 4.4,
    reviewCount: 34567,
    popularity: 89000,
    releaseYear: 1997,
    featured: false,
    previewContent: 'Introduction\n\nYou have it already. You just can\'t feel it because your mind is making too much noise.\n\n---PAGE---\n\nThe present moment is all you ever have. Make the Now the primary focus of your life.\n\n---PAGE---\n\nRealize deeply that the present moment is all you ever have. Make the Now the primary focus of your life.'
  },
  {
    id: 'book-13',
    title: 'Mistborn',
    author: 'Brandon Sanderson',
    description: 'A unique fantasy world where ash falls from the sky and mists dominate the night. A crew of thieves plan the ultimate heist.',
    synopsis: 'In a world of ash and mist, a street urchin named Vin discovers she has powers and joins a group of rebels attempting to overthrow the immortal Lord Ruler.',
    coverUrl: 'https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?w=400&h=600&fit=crop',
    categoryId: 'fantasy',
    rating: 4.6,
    reviewCount: 45678,
    popularity: 98000,
    releaseYear: 2006,
    featured: false,
    previewContent: 'Prologue\n\nAsh fell from the sky. A dark, sooty ash that fell across everything like a blanket of snow.\n\n---PAGE---\n\nVin crouched in the corner of the hovel, trying to make herself as small as possible. The skaa lord had come again.\n\n---PAGE---\n\n"There\'s always another secret," Kelsier whispered to the mists.'
  },
  {
    id: 'book-14',
    title: 'The Gene',
    author: 'Siddhartha Mukherjee',
    description: 'An intimate history of the gene, from its discovery to its role in the future of medicine.',
    synopsis: 'Mukherjee traces the history of the gene, from Mendel\'s pea plants to modern genetic engineering, exploring what it means to be human.',
    coverUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=600&fit=crop',
    categoryId: 'science',
    rating: 4.5,
    reviewCount: 12345,
    popularity: 67000,
    releaseYear: 2016,
    featured: false,
    previewContent: 'Prologue: Families\n\nThis book is the story of the birth, growth, and future of one of the most powerful and dangerous ideas in the history of science.\n\n---PAGE---\n\nThe gene is one of the most influential concepts in biology. It is also one of the most dangerous.\n\n---PAGE---\n\nI began to write this book because illness, as I have learned, has a tendency to be inherited.'
  },
  {
    id: 'book-15',
    title: 'Becoming',
    author: 'Michelle Obama',
    description: 'A deeply personal memoir from the former First Lady of the United States.',
    synopsis: 'Michelle Obama chronicles the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work.',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    categoryId: 'non-fiction',
    rating: 4.7,
    reviewCount: 89012,
    popularity: 178000,
    releaseYear: 2018,
    featured: false,
    previewContent: 'Preface\n\nI spent much of my childhood listening to the sound of striving.\n\n---PAGE---\n\nWe were not rich. We were not poor. We were somewhere in the middle, two parents and two kids living on the South Side of Chicago.\n\n---PAGE---\n\nI\'ve been blessed with good fortune in my life. But I\'ve had to work for everything I\'ve gotten.'
  },
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private books: Map<string, Book>;
  private categories: Map<string, Category>;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.categories = new Map();
    
    sampleCategories.forEach(cat => this.categories.set(cat.id, cat));
    sampleBooks.forEach(book => this.books.set(book.id, book));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBooks(options?: {
    category?: string;
    search?: string;
    sort?: 'popularity' | 'newest' | 'rating' | 'title';
    featured?: boolean;
    limit?: number;
    exclude?: string;
  }): Promise<Book[]> {
    let books = Array.from(this.books.values());

    if (options?.exclude) {
      books = books.filter(book => book.id !== options.exclude);
    }

    if (options?.category) {
      const categories = options.category.split(',');
      books = books.filter(book => categories.includes(book.categoryId));
    }

    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      books = books.filter(book =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.description.toLowerCase().includes(searchLower) ||
        book.categoryId.toLowerCase().includes(searchLower)
      );
    }

    if (options?.featured) {
      books = books.filter(book => book.featured);
    }

    switch (options?.sort) {
      case 'newest':
        books.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
        break;
      case 'rating':
        books.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'title':
        books.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popularity':
      default:
        books.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
    }

    if (options?.limit) {
      books = books.slice(0, options.limit);
    }

    return books;
  }

  async getBook(id: string): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async getFeaturedBooks(): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.featured);
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }
}

export const storage = new MemStorage();
