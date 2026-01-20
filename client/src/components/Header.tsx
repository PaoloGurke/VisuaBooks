import { Link, useLocation } from 'wouter';
import { BookOpen, Heart, Search, Menu, X, Sun, Moon, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavorites } from '@/contexts/FavoritesContext';

interface HeaderProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  profileImage: string;
  balance: number; // NEW: wallet balance
}

export function Header({ loggedIn, setLoggedIn, userName, profileImage, balance }: HeaderProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-lg group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold hidden sm:block">VisuaBooks</span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive(link.href) ? 'secondary' : 'ghost'}
                  size="sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right buttons */}
          <div className="flex items-center gap-2">
            <Link href="/catalog">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                    {favorites.length > 9 ? '9+' : favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {/* Wallet balance */}
            {loggedIn && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => window.location.href = '/wallet'}
              >
                <Wallet className="w-4 h-4" />
                ${balance}
              </Button>
            )}

            {/* Login / Profile */}
            {loggedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <img
                      src={profileImage || "/default-avatar.png"}
                      alt="Profile"
                      className="w-6 h-6 rounded-full"
                    />
                    {userName || "User"}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => setLoggedIn(false)}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="secondary" size="sm">Signup</Button>
                </Link>
              </>
            )}

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu items */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive(link.href) ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
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
