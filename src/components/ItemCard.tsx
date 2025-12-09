import { IronItem } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: IronItem;
  onSelect: (item: IronItem) => void;
}

export function ItemCard({ item, onSelect }: ItemCardProps) {
  const totalCounted = item.goodCount + item.brokenCount;
  const isComplete = totalCounted === item.batchSize;
  const progress = (totalCounted / item.batchSize) * 100;

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 animate-fade-in">
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
        <p className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3 line-clamp-1">{item.description}</p>

        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <div className="flex-1 h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isComplete ? "bg-success" : "bg-primary"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] md:text-xs font-medium text-muted-foreground">
            {totalCounted}/{item.batchSize}
          </span>
        </div>

        <div className="flex gap-1.5 md:gap-2 text-[10px] md:text-xs mb-3 md:mb-4">
          <div className="flex items-center gap-1 bg-success/10 text-success px-1.5 py-1 md:px-2.5 md:py-1.5 rounded-md md:rounded-lg font-medium">
            <span>✓</span>
            <span>{item.goodCount}</span>
          </div>
          <div className="flex items-center gap-1 bg-destructive/10 text-destructive px-1.5 py-1 md:px-2.5 md:py-1.5 rounded-md md:rounded-lg font-medium">
            <span>✗</span>
            <span>{item.brokenCount}</span>
          </div>
        </div>

        <Button onClick={() => onSelect(item)} className="w-full text-xs md:text-sm" size="sm">
          Inspect
        </Button>
      </div>
    </div>
  );
}
