import { Link, useLocation } from 'wouter';
import { BookOpen, Heart, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavorites } from '@/contexts/FavoritesContext';

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Browse Books' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" className="flex items-center gap-2 group" data-testid="link-home-logo">
            <div className="p-2 bg-primary rounded-lg group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold hidden sm:block">VisuaBooks</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive(link.href) ? 'secondary' : 'ghost'}
                  size="sm"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/catalog">
              <Button variant="ghost" size="icon" data-testid="button-header-search">
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            
            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="relative" data-testid="button-header-favorites">
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    {favorites.length > 9 ? '9+' : favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

{loggedIn ? (
  <Button
    variant="outline"
    size="sm"
    onClick={() => setLoggedIn(false)}
  >
    Logout
  </Button>
) : (
  <>
    <Link href="/login">
      <Button variant="ghost" size="sm">
        Login
      </Button>
    </Link>
    <Link href="/signup">
      <Button variant="secondary" size="sm">
        Signup
      </Button>
    </Link>
  </>
)}


            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive(link.href) ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
