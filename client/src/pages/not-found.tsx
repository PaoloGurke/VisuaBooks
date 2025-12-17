import { Link } from "wouter";
import { BookOpen, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-muted-foreground" />
        </div>
        
        <h1 className="font-serif text-4xl font-bold mb-4" data-testid="text-404-title">
          404
        </h1>
        
        <p className="text-xl text-muted-foreground mb-2">Page Not Found</p>
        
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for seems to have wandered off our shelves.
          Let's get you back on track.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button data-testid="button-go-home">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline" data-testid="button-browse-catalog">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
