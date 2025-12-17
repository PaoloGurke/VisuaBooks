export function BookCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] rounded-lg bg-muted" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="flex items-center justify-between">
          <div className="h-3 bg-muted rounded w-12" />
          <div className="h-5 bg-muted rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function BookGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse aspect-[4/3] rounded-lg bg-muted" />
  );
}

export function BookDetailSkeleton() {
  return (
    <div className="animate-pulse max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[320px,1fr] gap-8">
        <div className="aspect-[2/3] rounded-lg bg-muted" />
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded w-3/4" />
          <div className="h-6 bg-muted rounded w-1/2" />
          <div className="flex gap-2">
            <div className="h-6 bg-muted rounded w-20" />
            <div className="h-6 bg-muted rounded w-16" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
          <div className="h-12 bg-muted rounded w-48" />
        </div>
      </div>
    </div>
  );
}
