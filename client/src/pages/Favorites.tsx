import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Heart, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookCard } from '@/components/BookCard';
import { BookGridSkeleton } from '@/components/Skeleton';
import { useFavorites } from '@/contexts/FavoritesContext';
import type { Book } from '@shared/schema';

export default function Favorites() {
  const { favorites } = useFavorites();

  const { data: allBooks, isLoading } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });

  const favoriteBooks = allBooks?.filter(book => favorites.includes(book.id)) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <h1 className="font-serif text-3xl font-semibold mb-2">My Favorites</h1>
            <p className="text-muted-foreground">Your personal collection of favorite books</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <BookGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <h1 className="font-serif text-3xl font-semibold" data-testid="text-favorites-title">
              My Favorites
            </h1>
          </div>
          <p className="text-muted-foreground">
            {favorites.length > 0
              ? `You have ${favorites.length} book${favorites.length === 1 ? '' : 's'} in your favorites`
              : 'Start building your personal reading list'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {favoriteBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favoriteBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-2" data-testid="text-empty-state-title">
              No favorites yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring our collection and tap the heart icon on any book to add it to your favorites.
            </p>
            <Link href="/catalog">
              <Button size="lg" data-testid="button-browse-books">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Books
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      {favoriteBooks.length > 0 && (
        <div className="bg-card border-t border-border py-12 mt-8">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h3 className="font-serif text-xl font-semibold mb-2">
              Ready to discover more?
            </h3>
            <p className="text-muted-foreground mb-6">
              Continue exploring our collection to find your next great read.
            </p>
            <Link href="/catalog">
              <Button variant="outline" data-testid="button-explore-more">
                Explore More Books
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
