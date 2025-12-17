import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { ArrowRight, Sparkles, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookCard } from '@/components/BookCard';
import { CategoryCard } from '@/components/CategoryCard';
import { SearchBar } from '@/components/SearchBar';
import { BookGridSkeleton, CategoryCardSkeleton } from '@/components/Skeleton';
import type { Book, Category } from '@shared/schema';
import heroImage from '@assets/stock_images/cozy_modern_library__4bb042a2.jpg';
import fictionImage from '@assets/stock_images/classic_novels_stack_93e75d0c.jpg';
import nonFictionImage from '@assets/stock_images/modern_workspace_wit_21f8e0b2.jpg';
import scienceImage from '@assets/stock_images/astronomy_space_gala_f90c71a3.jpg';
import fantasyImage from '@assets/stock_images/mystical_magical_for_3dd6b79a.jpg';
import selfHelpImage from '@assets/stock_images/peaceful_minimalist__4ca0ebfe.jpg';

const categoryImages: Record<string, string> = {
  'fiction': fictionImage,
  'non-fiction': nonFictionImage,
  'science': scienceImage,
  'fantasy': fantasyImage,
  'self-help': selfHelpImage,
};

export default function Home() {
  const { data: featuredBooks, isLoading: loadingFeatured } = useQuery<Book[]>({
    queryKey: ['/api/books/featured'],
  });

  const { data: categories, isLoading: loadingCategories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: popularBooks, isLoading: loadingPopular } = useQuery<Book[]>({
    queryKey: ['/api/books?sort=popularity&limit=10'],
  });

  const { data: newBooks, isLoading: loadingNew } = useQuery<Book[]>({
    queryKey: ['/api/books?sort=newest&limit=5'],
  });

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Cozy library with bookshelves"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Read Instantly Online</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
            Discover Your Next
            <br />
            <span className="text-primary-foreground">Great Read</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
            Explore thousands of digital books across every genre. No downloads, no waiting. Start reading instantly in your browser.
          </p>

          <SearchBar large className="mb-8" />

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/catalog">
              <Button size="lg" className="rounded-full px-8" data-testid="button-browse-books">
                Browse Books
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="rounded-full px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20" data-testid="button-learn-more">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2" data-testid="text-featured-heading">
                Featured Books
              </h2>
              <p className="text-muted-foreground">Handpicked selections for you</p>
            </div>
            <Link href="/catalog?featured=true">
              <Button variant="ghost" data-testid="button-view-all-featured">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {loadingFeatured ? (
            <BookGridSkeleton count={5} />
          ) : featuredBooks && featuredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {featuredBooks.slice(0, 5).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No featured books available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2" data-testid="text-categories-heading">
              Browse by Category
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore our curated collection across various genres
            </p>
          </div>

          {loadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))}
            </div>
          ) : categories && categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description || ''}
                  imageUrl={categoryImages[category.id] || fictionImage}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold" data-testid="text-popular-heading">
                  Popular Right Now
                </h2>
                <p className="text-muted-foreground text-sm">What readers are loving</p>
              </div>
            </div>
            <Link href="/catalog?sort=popularity">
              <Button variant="ghost" data-testid="button-view-all-popular">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {loadingPopular ? (
            <BookGridSkeleton count={5} />
          ) : popularBooks && popularBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {popularBooks.slice(0, 5).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold" data-testid="text-new-heading">
                  New Arrivals
                </h2>
                <p className="text-muted-foreground text-sm">Fresh additions to our library</p>
              </div>
            </div>
            <Link href="/catalog?sort=newest">
              <Button variant="ghost" data-testid="button-view-all-new">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {loadingNew ? (
            <BookGridSkeleton count={5} />
          ) : newBooks && newBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {newBooks.slice(0, 5).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <BookOpen className="w-12 h-12 text-primary-foreground mx-auto mb-6" />
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary-foreground mb-4">
            Start Your Reading Journey Today
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of readers who have discovered their favorite books on PageTurner. 
            All digital, all instant, all in your browser.
          </p>
          <Link href="/catalog">
            <Button size="lg" variant="secondary" className="rounded-full px-8" data-testid="button-explore-library">
              Explore Our Library
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
