import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getFavorites, toggleFavorite as toggleFav, isFavorite as isFav } from '@/lib/favorites';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = (bookId: string) => {
    const result = toggleFav(bookId);
    setFavorites(result.favorites);
  };

  const isFavorite = (bookId: string) => {
    return favorites.includes(bookId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
