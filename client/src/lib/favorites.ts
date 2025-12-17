const FAVORITES_KEY = 'pageturner_favorites';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(bookId: string): string[] {
  const favorites = getFavorites();
  if (!favorites.includes(bookId)) {
    favorites.push(bookId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
  return favorites;
}

export function removeFavorite(bookId: string): string[] {
  const favorites = getFavorites().filter(id => id !== bookId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

export function isFavorite(bookId: string): boolean {
  return getFavorites().includes(bookId);
}

export function toggleFavorite(bookId: string): { favorites: string[]; isFavorite: boolean } {
  if (isFavorite(bookId)) {
    return { favorites: removeFavorite(bookId), isFavorite: false };
  }
  return { favorites: addFavorite(bookId), isFavorite: true };
}
