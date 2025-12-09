import { IronItem } from "@/types/inventory";

interface ItemCardProps {
  item: IronItem;
  onSelect: (item: IronItem) => void;
}

export function ItemCard({ item, onSelect }: ItemCardProps) {
  const totalCounted = item.goodCount + item.brokenCount;
  const isComplete = totalCounted === item.batchSize;

  return (
    <div 
      className="bg-card rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 animate-fade-in cursor-pointer"
      onClick={() => onSelect(item)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {isComplete && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-success text-success-foreground text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-md">
            Complete
          </div>
        )}
        {!isComplete && totalCounted > 0 && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-secondary text-secondary-foreground text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-md">
            In Progress
          </div>
        )}
      </div>

      <div className="p-3 md:p-4">
        <h3 className="font-bold text-foreground text-sm md:text-base mb-0.5 md:mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-muted-foreground text-xs md:text-sm line-clamp-1">{item.description}</p>
      </div>
    </div>
  );
}
