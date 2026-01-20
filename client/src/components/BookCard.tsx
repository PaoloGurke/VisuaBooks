import { Link } from 'wouter';
import { Heart, Star, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/contexts/FavoritesContext';
import type { Book } from '@shared/schema';

interface BookCardProps {
  book: Book;
  locked?: boolean;
  price?: number;
}

export function BookCard({ book, locked, price }: BookCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(book.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(book.id);
  };

  return (
    <Link href={`/book/${book.id}`}>
      <article 
        className={`group relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
          locked && price ? 'filter blur-sm pointer-events-none' : ''
        }`}
      >
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
          <img
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {locked && price && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-background/80 backdrop-blur-sm transition-all duration-200 ${
              favorited ? 'text-red-500' : 'text-muted-foreground'
            } hover:scale-110`}
            style={{ visibility: favorited ? 'visible' : undefined }}
            onClick={handleFavoriteClick}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </Button>

          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-xs line-clamp-2">{book.description}</p>
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-serif font-medium text-sm line-clamp-1 mb-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-muted-foreground text-xs mb-2 line-clamp-1">
            {book.author}
          </p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium">{book.rating?.toFixed(1) || '0.0'}</span>
            </div>
            <Badge variant="secondary" className="text-xs px-2 py-0">
              {book.categoryId}
            </Badge>
          </div>
        </div>
      </article>
    </Link>
  );
}
