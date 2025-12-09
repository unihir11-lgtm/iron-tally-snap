import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategorySidebar } from "@/components/CategorySidebar";
import { ItemCard } from "@/components/ItemCard";
import { InspectionForm } from "@/components/InspectionForm";
import { categories, ironItems as initialItems } from "@/data/inventory";
import { IronItem } from "@/types/inventory";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Search, Factory, ClipboardList, PackageOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [items, setItems] = useState<IronItem[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<IronItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectItem = (item: IronItem) => {
    setSelectedItem(item);
  };

  const handleSaveInspection = (
    item: IronItem,
    goodCount: number,
    brokenCount: number
  ) => {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, goodCount, brokenCount } : i
      )
    );
    setSelectedItem(null);
    toast({
      title: "Inspection Saved",
      description: `${item.name}: ${goodCount} good, ${brokenCount} broken`,
    });
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  // Show inspection form when an item is selected
  if (selectedItem) {
    return (
      <InspectionForm
        item={selectedItem}
        onSave={handleSaveInspection}
        onBack={handleBack}
      />
    );
  }

  // Show catalog view
  return (
    <div className="min-h-screen bg-background flex">
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex-1 flex flex-col min-h-screen md:ml-0">
        {/* Header */}
        <header className="gradient-hero text-primary-foreground p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Factory className="text-secondary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold">Iron Factory</h1>
                <p className="text-primary-foreground/80 text-xs md:text-sm">
                  Quality Control System
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate("/inward")}
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <PackageOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Inward</span>
              </Button>
              <Button
                onClick={() => navigate("/material-request")}
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <ClipboardList className="h-4 w-4" />
                <span className="hidden sm:inline">Material Request</span>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 md:h-12 pl-11 pr-4 rounded-xl bg-card text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-secondary text-sm md:text-base"
            />
          </div>
        </header>

        {/* Stats Bar */}
        <div className="bg-card border-b border-border p-3 md:p-4">
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-1">
            <div className="flex items-center gap-1.5 md:gap-2 bg-muted px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
              <span className="text-muted-foreground">Total:</span>
              <span className="text-foreground font-bold">{items.length}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-success/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
              <span className="text-success">Good:</span>
              <span className="text-success font-bold">
                {items.reduce((acc, item) => acc + item.goodCount, 0)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-destructive/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
              <span className="text-destructive">Broken:</span>
              <span className="text-destructive font-bold">
                {items.reduce((acc, item) => acc + item.brokenCount, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-6 overflow-y-auto pb-20 md:pb-6">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onSelect={handleSelectItem} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-5xl md:text-6xl mb-4">🔍</div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                No items found
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Try a different category or search term
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
