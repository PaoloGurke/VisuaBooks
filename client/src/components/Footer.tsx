import { Link } from 'wouter';
import { BookOpen, Mail, Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  { name: 'Fiction', href: '/catalog?category=fiction' },
  { name: 'Non-Fiction', href: '/catalog?category=non-fiction' },
  { name: 'Science', href: '/catalog?category=science' },
  { name: 'Fantasy', href: '/catalog?category=fantasy' },
  { name: 'Self-Help', href: '/catalog?category=self-help' },
];

const quickLinks = [
  { name: 'Browse Books', href: '/catalog' },
  { name: 'Featured', href: '/' },
  { name: 'My Favorites', href: '/favorites' },
  { name: 'About Us', href: '/about' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" data-testid="link-footer-logo">
              <div className="p-2 bg-primary rounded-lg">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold">VisuaBooks</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Your digital gateway to endless reading. Discover, explore, and read books instantly online.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-social-twitter">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-instagram">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-facebook">
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href}>
                    <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer" data-testid={`link-footer-category-${category.name.toLowerCase()}`}>
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer" data-testid={`link-footer-${link.name.toLowerCase().replace(' ', '-')}`}>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get notified about new books and updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button size="icon" data-testid="button-newsletter-submit">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            2024 VisuaBooks. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Digital books only. No physical delivery.
          </p>
        </div>
      </div>
    </footer>
  );
}
