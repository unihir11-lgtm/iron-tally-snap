import { useState } from "react";
import { IronItem } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Minus, Check, X } from "lucide-react";

interface InspectionFormProps {
  item: IronItem;
  onSave: (item: IronItem, goodCount: number, brokenCount: number) => void;
  onBack: () => void;
}

export function InspectionForm({ item, onSave, onBack }: InspectionFormProps) {
  const [goodCount, setGoodCount] = useState(item.goodCount);
  const [brokenCount, setBrokenCount] = useState(item.brokenCount);

  const totalCounted = goodCount + brokenCount;
  const remaining = item.batchSize - totalCounted;
  const progress = (totalCounted / item.batchSize) * 100;
  const isComplete = totalCounted === item.batchSize;
  const isOverflow = totalCounted > item.batchSize;

  const adjustCount = (type: "good" | "broken", delta: number) => {
    if (type === "good") {
      const newValue = Math.max(0, goodCount + delta);
      if (newValue + brokenCount <= item.batchSize) {
        setGoodCount(newValue);
      }
    } else {
      const newValue = Math.max(0, brokenCount + delta);
      if (goodCount + newValue <= item.batchSize) {
        setBrokenCount(newValue);
      }
    }
  };

  const handleSave = () => {
    onSave(item, goodCount, brokenCount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero text-primary-foreground p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Catalog</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">Quality Inspection</h1>
          <p className="text-primary-foreground/80 mt-1">
            Record good and broken items from batch
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6 -mt-4">
        <div className="bg-card rounded-2xl shadow-elevated overflow-hidden animate-scale-in">
          {/* Item Info */}
          <div className="flex flex-col md:flex-row gap-6 p-6 border-b border-border">
            <div className="w-full md:w-48 aspect-square rounded-xl overflow-hidden bg-muted shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">{item.name}</h2>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{item.batchSize}</div>
                  <div className="text-sm text-muted-foreground">Batch Size</div>
                </div>
                <div className="bg-success/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-success">{goodCount}</div>
                  <div className="text-sm text-success">Good</div>
                </div>
                <div className="bg-destructive/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-destructive">{brokenCount}</div>
                  <div className="text-sm text-destructive">Broken</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-6 bg-muted/30 border-b border-border">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-foreground">Progress</span>
              <span className={`font-bold ${isComplete ? "text-success" : isOverflow ? "text-destructive" : "text-muted-foreground"}`}>
                {totalCounted} / {item.batchSize} items
                {remaining > 0 && ` (${remaining} remaining)`}
              </span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isComplete ? "bg-success" : isOverflow ? "bg-destructive" : "bg-primary"
                }`}
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>

          {/* Counter Controls */}
          <div className="p-6 space-y-6">
            {/* Good Items Counter */}
            <div className="bg-success/5 border-2 border-success/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center shadow-glow-success">
                    <Check className="text-success-foreground" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">Good Items</h3>
                    <p className="text-sm text-muted-foreground">Items in good condition</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="counter"
                  size="iconLg"
                  onClick={() => adjustCount("good", -10)}
                  disabled={goodCount < 10}
                >
                  -10
                </Button>
                <Button
                  variant="counter"
                  size="iconLg"
                  onClick={() => adjustCount("good", -1)}
                  disabled={goodCount < 1}
                >
                  <Minus size={20} />
                </Button>
                
                <div className="w-32 h-20 bg-card rounded-xl flex items-center justify-center border-2 border-success shadow-inner">
                  <span className="text-4xl font-bold text-success">{goodCount}</span>
                </div>
                
                <Button
                  variant="counter"
                  size="iconLg"
                  onClick={() => adjustCount("good", 1)}
                  disabled={remaining < 1}
                >
                  <Plus size={20} />
                </Button>
                <Button
                  variant="counter"
                  size="iconLg"
                  onClick={() => adjustCount("good", 10)}
                  disabled={remaining < 10}
                >
                  +10
                </Button>
              </div>
            </div>

            {/* Broken Items Counter */}
            <div className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center shadow-glow-danger">
                    <X className="text-destructive-foreground" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">Broken Items</h3>
                    <p className="text-sm text-muted-foreground">Items with defects</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="counter"
                  size="iconLg"
                  onClick={() => adjustCount("broken", -10)}
                  disabled={brokenCount < 10}
                >
                  -10
                </Button>
                <Button
                  variant="counter"
                  size="iconLg"
                  onClick={() => adjustCount("broken", -1)}
                  disabled={brokenCount < 1}
                >
                  <Minus size={20} />
                </Button>
                
                <div className="w-32 h-20 bg-card rounded-xl flex items-center justify-center border-2 border-destructive shadow-inner">
                  <span className="text-4xl font-bold text-destructive">{brokenCount}</span>
                </div>
                
                <Button
                  variant="counter"
                  size="iconLg"
                  onClick={() => adjustCount("broken", 1)}
                  disabled={remaining < 1}
                >
                  <Plus size={20} />
                </Button>
                <Button
                  variant="counter"
                  size="iconLg"
                  onClick={() => adjustCount("broken", 10)}
                  disabled={remaining < 10}
                >
                  +10
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 bg-muted/30 border-t border-border flex flex-col sm:flex-row gap-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Cancel
            </Button>
            <Button
              variant={isComplete ? "success" : "default"}
              onClick={handleSave}
              className="flex-1"
              size="lg"
            >
              {isComplete ? "Complete Inspection" : "Save Progress"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
