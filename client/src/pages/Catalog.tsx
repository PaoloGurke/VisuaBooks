import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearch } from 'wouter';
import { Filter, SlidersHorizontal, Grid, List, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { BookCard } from '@/components/BookCard';
import { SearchBar } from '@/components/SearchBar';
import { BookGridSkeleton } from '@/components/Skeleton';
import type { Book, Category } from '@shared/schema';

type SortOption = 'popularity' | 'newest' | 'rating' | 'title';

export default function Catalog() {
  const searchParams = useSearch();
  const [, setLocation] = useLocation();
  
  const urlParams = new URLSearchParams(searchParams);
  const initialCategory = urlParams.get('category') || '';
  const initialSearch = urlParams.get('search') || '';
  const initialSort = (urlParams.get('sort') as SortOption) || 'popularity';

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const buildQueryUrl = () => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','));
    }
    if (sortBy) {
      params.set('sort', sortBy);
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    const queryString = params.toString();
    return queryString ? `/api/books?${queryString}` : '/api/books';
  };

  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: [buildQueryUrl()],
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','));
    }
    if (sortBy !== 'popularity') {
      params.set('sort', sortBy);
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    const newUrl = params.toString() ? `/catalog?${params.toString()}` : '/catalog';
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState(null, '', newUrl);
    }
  }, [selectedCategories, sortBy, searchQuery]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setSortBy('popularity');
  };

  const hasActiveFilters = selectedCategories.length > 0 || searchQuery;

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'title', label: 'Title (A-Z)' },
  ];

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories?.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                data-testid={`checkbox-category-${category.id}`}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
          data-testid="button-clear-filters"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h1 className="font-serif text-3xl font-semibold mb-2" data-testid="text-catalog-title">
            Browse Books
          </h1>
          <p className="text-muted-foreground mb-6">
            Discover your next great read from our digital collection
          </p>
          <SearchBar
            placeholder="Search by title, author, or keyword..."
            onSearch={setSearchQuery}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden" data-testid="button-mobile-filters">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedCategories.length + (searchQuery ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {selectedCategories.map((catId) => {
              const category = categories?.find(c => c.id === catId);
              return (
                <Badge
                  key={catId}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleCategory(catId)}
                  data-testid={`badge-filter-${catId}`}
                >
                  {category?.name || catId}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              );
            })}

            {searchQuery && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSearchQuery('')}
                data-testid="badge-filter-search"
              >
                Search: {searchQuery}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[160px]" data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-lg border border-border p-4">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h2>
              <FilterContent />
            </div>
          </aside>

          <main className="flex-1">
            {isLoading ? (
              <BookGridSkeleton count={15} />
            ) : books && books.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4" data-testid="text-results-count">
                  Showing {books.length} {books.length === 1 ? 'book' : 'books'}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No books found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline" onClick={clearFilters} data-testid="button-clear-all">
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
