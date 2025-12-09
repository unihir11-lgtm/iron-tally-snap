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
          <div className="absolute top-3 left-3 bg-success text-success-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            Complete
          </div>
        )}
        {!isComplete && totalCounted > 0 && (
          <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            In Progress
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-foreground text-base mb-1">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-3">{item.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isComplete ? "bg-success" : "bg-primary"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {totalCounted}/{item.batchSize}
          </span>
        </div>

        <div className="flex gap-2 text-xs mb-4">
          <div className="flex items-center gap-1.5 bg-success/10 text-success px-2.5 py-1.5 rounded-lg font-medium">
            <span>✓</span>
            <span>{item.goodCount} Good</span>
          </div>
          <div className="flex items-center gap-1.5 bg-destructive/10 text-destructive px-2.5 py-1.5 rounded-lg font-medium">
            <span>✗</span>
            <span>{item.brokenCount} Broken</span>
          </div>
        </div>

        <Button onClick={() => onSelect(item)} className="w-full" size="lg">
          Inspect Item
        </Button>
      </div>
    </div>
  );
}
