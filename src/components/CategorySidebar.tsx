import { useState } from "react";
import { Category } from "@/types/inventory";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (categoryId: string) => {
    onSelectCategory(categoryId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 left-4 z-50 w-14 h-14 bg-sidebar-primary text-sidebar-primary-foreground rounded-full shadow-lg flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-foreground/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar flex flex-col items-center py-6 gap-2 border-r border-sidebar-border shrink-0 transition-transform duration-300",
          "fixed md:relative z-40 h-full",
          "w-20 md:w-28",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="text-sidebar-foreground font-bold text-[10px] md:text-xs uppercase tracking-wider mb-4 opacity-70">
          Categories
        </div>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleSelect(category.id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 md:p-3 rounded-xl transition-all duration-200 w-16 md:w-24",
              selectedCategory === category.id
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg scale-105"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span className="text-xl md:text-2xl">{category.icon}</span>
            <span className="text-[9px] md:text-xs font-medium text-center leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </aside>
    </>
  );
}
