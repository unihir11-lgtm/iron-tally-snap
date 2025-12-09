import { Category } from "@/types/inventory";
import { cn } from "@/lib/utils";

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
  return (
    <aside className="w-24 md:w-28 bg-sidebar flex flex-col items-center py-6 gap-2 border-r border-sidebar-border shrink-0">
      <div className="text-sidebar-foreground font-bold text-xs uppercase tracking-wider mb-4 opacity-70">
        Categories
      </div>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            "flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 w-20 md:w-24",
            selectedCategory === category.id
              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg scale-105"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <span className="text-2xl">{category.icon}</span>
          <span className="text-[10px] md:text-xs font-medium text-center leading-tight">
            {category.name}
          </span>
        </button>
      ))}
    </aside>
  );
}
