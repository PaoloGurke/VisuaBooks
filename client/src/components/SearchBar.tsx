import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useLocation } from 'wouter';

interface SearchBarProps {
  large?: boolean;
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ large = false, placeholder = "Search books by title, author, or genre...", className = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        setLocation(`/catalog?search=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className={`relative flex items-center ${large ? 'max-w-2xl mx-auto' : ''}`}>
        <Search className={`absolute left-4 text-muted-foreground ${large ? 'w-5 h-5' : 'w-4 h-4'}`} />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`pl-12 pr-24 ${large ? 'h-14 text-base rounded-full shadow-lg' : 'h-10 rounded-lg'}`}
          data-testid="input-search"
        />
        <Button
          type="submit"
          className={`absolute right-2 ${large ? 'rounded-full px-6' : 'rounded-md px-4'}`}
          size={large ? 'default' : 'sm'}
          data-testid="button-search-submit"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
