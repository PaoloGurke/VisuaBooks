import { X, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import type { Book } from '@shared/schema';

interface BookPreviewModalProps {
  book: Book;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookPreviewModal({ book, open, onOpenChange }: BookPreviewModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const previewPages = book.previewContent 
    ? book.previewContent.split('---PAGE---').filter(Boolean)
    : [
      `Welcome to the preview of "${book.title}" by ${book.author}.\n\nThis is a sample of what you'll experience when reading this captivating book. The full digital version offers an immersive reading experience with beautiful typography and seamless navigation.\n\nContinue reading to discover more...`,
      `Chapter One\n\nThe story begins in a world where imagination knows no bounds. Every page turns to reveal new adventures, deeper characters, and unexpected twists that will keep you engaged from start to finish.\n\n"A masterpiece of storytelling" - Literary Review`,
      `About the Reading Experience\n\nOur digital reader provides:\n\n- Adjustable font sizes\n- Night mode for comfortable reading\n- Bookmarking your progress\n- Seamless synchronization across devices\n\nStart your reading journey today!`
    ];

  const totalPages = previewPages.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <DialogTitle className="font-serif text-lg line-clamp-1" data-testid="text-preview-title">
                {book.title} - Preview
              </DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} data-testid="button-close-preview">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-card">
          <div className="max-w-2xl mx-auto px-6 py-8">
            <div className="bg-background rounded-lg border border-border p-8 min-h-[400px] shadow-sm">
              <p className="whitespace-pre-line text-foreground leading-relaxed" data-testid="text-preview-content">
                {previewPages[currentPage]}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-border bg-background flex-shrink-0">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 0}
            data-testid="button-prev-page"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {previewPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPage ? 'bg-primary' : 'bg-muted'
                }`}
                data-testid={`button-page-dot-${index}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            data-testid="button-next-page"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
