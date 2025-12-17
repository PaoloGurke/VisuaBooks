# Design Guidelines: Modern Digital Bookstore

## Design Approach
**Reference-Based Design** drawing inspiration from premium e-commerce platforms (Airbnb's card aesthetics, Amazon's browsing patterns, Etsy's visual discovery) combined with modern reading platforms like Goodreads and Apple Books.

## Typography System
- **Primary Font**: DM Sans (clean, modern sans-serif via Google Fonts)
- **Display/Accent**: Playfair Display (for elegant book titles and hero headlines)
- **Hierarchy**:
  - Hero Headline: 4xl-6xl, Playfair Display, bold
  - Section Headers: 3xl-4xl, DM Sans, semibold
  - Book Titles: xl-2xl, Playfair Display, medium
  - Body Text: base-lg, DM Sans, regular
  - Metadata (author, genre): sm-base, DM Sans, medium

## Layout & Spacing System
**Tailwind Units**: Consistently use 4, 6, 8, 12, 16, 20, 24 for spacing
- Section padding: py-16 md:py-24 lg:py-32
- Card gaps: gap-6 md:gap-8
- Container: max-w-7xl mx-auto px-4 md:px-6

## Component Library

### Homepage Structure
1. **Hero Section** (80vh): Full-width background image showcasing a curated library/reading space atmosphere with book spines. Overlay with blur backdrop for centered content: bookstore name (massive Playfair Display), tagline, prominent search bar with rounded corners and shadow
2. **Search Bar**: Large (h-14), rounded-full, shadow-lg, with search icon prefix
3. **Featured Books Carousel**: Horizontal scrolling showcase with 5-6 large book covers (aspect-ratio-[2/3])
4. **Category Cards Grid**: 2x3 grid (md:grid-cols-3 lg:grid-cols-6) with genre-themed imagery, overlay text, hover lift effect

### Book Catalog Page
- **Grid Layout**: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
- **Book Cards**: Vertical cards with cover image (aspect-ratio-[2/3]), title, author, rating stars, hover scale-105 transform
- **Filters Sidebar**: Sticky left column (hidden on mobile, drawer on tap) with checkbox groups for genres, ratings, release year
- **Sort Dropdown**: Top-right with options for popularity, newest, rating

### Book Details Page
- **Two-column layout**: 
  - Left (40%): Large cover image with shadow-2xl
  - Right (60%): Title (3xl Playfair), author, genre pills, star rating, synopsis (prose max-w-2xl), "Read Preview" CTA button (large, primary)
- **Preview Modal**: Full-screen overlay with book reader interface showing sample pages in card-style containers

### Favorites/Wishlist
- **Heart Icons**: Absolute positioned top-right on all book cards, filled state animation
- **Wishlist Page**: Same grid layout as catalog, empty state with illustration and CTA

### Footer
- **Multi-column** (grid-cols-2 md:grid-cols-4): Quick Links, Categories, Popular Books (small covers), Newsletter signup with input+button combo

## Images

### Hero Section
**Large Hero Image**: Yes - Full-width, high-quality photograph of a modern, cozy library or reading nook with soft lighting. Showcases books on shelves with warm, inviting atmosphere. Apply dark overlay (bg-black/40) for text contrast.

### Category Cards
Each category card includes thematic imagery:
- Fiction: Stack of classic novels with vintage aesthetic
- Non-Fiction: Modern workspace with open books
- Science: Astronomy/science lab imagery
- Fantasy: Mystical/ethereal book with glowing elements
- Self-Help: Peaceful minimalist scene with single book

### Book Covers
High-quality cover images for all books in catalog, details, and featured sections. Use placeholder service (like Unsplash book category) for demo.

### About Page
Team photo or bookstore ambiance photo showcasing the digital reading experience philosophy.

## Interaction Patterns
- **Hover States**: Book cards scale to 105%, add shadow-xl
- **Favorites**: Heart icon bounces on click, fills with smooth animation
- **Search**: Auto-suggest dropdown appears below search bar as user types
- **Filters**: Instant filtering with smooth fade transitions
- **Preview Button**: Opens modal with slide-up animation
- **Mobile**: Category cards scroll horizontally, filters become bottom drawer

## Responsive Breakpoints
- Mobile: Single column, stacked layouts, bottom navigation
- Tablet: 2-3 column grids, visible filters
- Desktop: Full multi-column layouts, sticky sidebars

## Key Visual Elements
- **Rounded Corners**: Consistent border-radius (rounded-lg for cards, rounded-full for buttons/search)
- **Shadows**: Layered elevation (shadow-md for cards, shadow-xl on hover, shadow-2xl for modals)
- **Aspect Ratios**: Strict 2:3 for all book covers
- **Rating Stars**: Gold/yellow filled stars with half-star support
- **Genre Pills**: Small rounded-full badges with subtle backgrounds

This design creates a premium, book-focused browsing experience emphasizing visual discovery and effortless interaction.