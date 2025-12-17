import { Link } from 'wouter';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export function CategoryCard({ id, name, description, imageUrl }: CategoryCardProps) {
  return (
    <Link href={`/catalog?category=${id}`}>
      <article 
        className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
        data-testid={`card-category-${id}`}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-serif text-white text-lg font-semibold mb-1 group-hover:text-primary-foreground transition-colors" data-testid={`text-category-name-${id}`}>
            {name}
          </h3>
          <p className="text-white/80 text-sm line-clamp-2">
            {description}
          </p>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-lg transition-colors duration-300" />
      </article>
    </Link>
  );
}
