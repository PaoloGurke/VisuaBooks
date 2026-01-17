import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { Heart, Star, ArrowLeft, BookOpen, Calendar, Users, Share2 } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookCard } from '@/components/BookCard';
import { BookPreviewModal } from '@/components/BookPreviewModal';
import { BookDetailSkeleton } from '@/components/Skeleton';
import { useFavorites } from '@/contexts/FavoritesContext';
import type { Book } from '@shared/schema';

// Import API functions
 //    import { addFavorite, removeFavorite, setBookRating } from '@/api/bookAPI';

export default function BookDetails() {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const queryClient = useQueryClient();

  // Fetch book details
  const { data: book, isLoading, error } = useQuery<Book>({
    queryKey: [`/api/books/${id}`],
    enabled: !!id,
  });

  // Fetch related books
  const relatedBooksUrl = book?.categoryId
    ? `/api/books?category=${book.categoryId}&limit=6&exclude=${id}`
    : null;

  const { data: relatedBooks } = useQuery<Book[]>({
    queryKey: [relatedBooksUrl],
    enabled: !!relatedBooksUrl,
  });

  // --- Mutations for favorites ---
  // const addFavoriteMutation = useMutation(addFavorite, {
  //  onSuccess: () => queryClient.invalidateQueries([`/api/books/${id}`]),
  // });

  // const removeFavoriteMutation = useMutation(removeFavorite, {
  //  onSuccess: () => queryClient.invalidateQueries([`/api/books/${id}`]),
  // });

  // --- Mutation for rating ---
  // const ratingMutation = useMutation(({ bookId, rating }: { bookId: string; rating: number }) =>
 //   setBookRating(bookId, rating), {
 //   onSuccess: () => queryClient.invalidateQueries([`/api/books/${id}`]),
 // });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <BookDetailSkeleton />
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-semibold mb-2">Book Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/catalog">
            <Button data-testid="button-back-to-catalog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(book.id);

  // Handle favorite click
 // const handleFavorite = () => {
 //   toggleFavorite(book.id);
 //   if (!favorited) addFavoriteMutation.mutate(book.id);
 //   else removeFavoriteMutation.mutate(book.id);
 // };

  // Handle star click
//  const handleRating = (starValue: number) => {
   // setUserRating(starValue);
  //  ratingMutation.mutate({ bookId: book.id, rating: starValue });
//  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {/* Back Button */}
        <Link href="/catalog">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
        </Link>

        <div className="grid md:grid-cols-[320px,1fr] gap-8 lg:gap-12">
          {/* Book Cover & Action Buttons */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted shadow-2xl">
                <img
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-full object-cover"
                  data-testid="img-book-cover"
                />
              </div>

              <div className="flex gap-2 mt-6">
                <Button size="lg" className="flex-1" onClick={() => setPreviewOpen(true)} data-testid="button-read-preview">
                  <BookOpen className="w-4 h-4 mr-2" /> Read Preview
                </Button>

                <Button
                  size="lg"
                  variant={favorited ? 'secondary' : 'outline'}
            //      onClick={handleFavorite}
                  data-testid="button-favorite"
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-current text-red-500' : ''}`} />
                </Button>

                <Button size="lg" variant="outline" data-testid="button-share">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div>
            {/* Category & Featured Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link href={`/catalog?category=${book.categoryId}`}>
                <Badge variant="secondary" className="cursor-pointer" data-testid="badge-category">
                  {book.categoryId.charAt(0).toUpperCase() + book.categoryId.slice(1).replace('-', ' ')}
                </Badge>
              </Link>
              {book.featured && <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Featured</Badge>}
            </div>

            {/* Title & Author */}
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2" data-testid="text-book-title">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4" data-testid="text-book-author">
              by {book.author}
            </p>

            {/* Ratings */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starValue = i + 1;
                  const activeRating = hoverRating ?? userRating ?? Math.floor(book.rating || 0);
                  return (
                    <Star
                      key={i}
                      className={`w-5 h-5 cursor-pointer transition-colors ${starValue <= activeRating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(null)}
               //       onClick={() => handleRating(starValue)}
                    />
                  );
                })}
                <span className="ml-2 font-medium">{userRating ?? book.rating?.toFixed(1) ?? '0.0'}</span>
                <span className="text-muted-foreground">({book.reviewCount?.toLocaleString() || 0} reviews)</span>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
              {book.releaseYear && <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Published {book.releaseYear}</div>}
              {book.popularity && <div className="flex items-center gap-2"><Users className="w-4 h-4" />{book.popularity.toLocaleString()} readers</div>}
            </div>

            <Separator className="my-6" />

            {/* Description & Synopsis */}
            <div>
              <h2 className="font-semibold text-lg mb-3">About this book</h2>
              <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-book-description">{book.description}</p>
              {book.synopsis && (
                <div className="bg-card rounded-lg border border-border p-4 mt-4">
                  <h3 className="font-medium mb-2">Synopsis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-book-synopsis">{book.synopsis}</p>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            {/* Digital Reading Experience */}
            <div className="bg-primary/5 rounded-lg border border-primary/10 p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Digital Reading Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Read this book instantly in your browser. No downloads required. Optimized for all devices with adjustable fonts and night mode.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks && relatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-semibold mb-6">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {relatedBooks.filter((b) => b.id !== book.id).slice(0, 5).map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <BookPreviewModal book={book} open={previewOpen} onOpenChange={setPreviewOpen} />
    </div>
  );
}
