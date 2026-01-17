// Simulating a database for now (later we replace with real DB)
let bookRatings: Record<string, number> = {};  // bookId -> rating
let bookFavorites: Record<string, boolean> = {}; // bookId -> favorited

export async function getBookRating(bookId: string) {
  return bookRatings[bookId] ?? 0; // return 0 if not rated
}

export async function setBookRating(bookId: string, rating: number) {
  bookRatings[bookId] = rating;
  return { bookId, rating };
}

export async function addFavorite(bookId: string) {
  bookFavorites[bookId] = true;
  return { bookId, favorited: true };
}

export async function removeFavorite(bookId: string) {
  bookFavorites[bookId] = false;
  return { bookId, favorited: false };
}
