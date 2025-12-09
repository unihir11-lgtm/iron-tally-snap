import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Minus, Search, X, MapPin } from "lucide-react";
import { ironItems } from "@/data/inventory";
import { IronItem } from "@/types/inventory";
import { MaterialRequestItem } from "@/types/materialRequest";
import { toast } from "@/hooks/use-toast";

const sites = [
  { id: "site-1", name: "Site A - Main Factory" },
  { id: "site-2", name: "Site B - Warehouse" },
  { id: "site-3", name: "Site C - Assembly Unit" },
  { id: "site-4", name: "Site D - Storage Yard" },
];

interface MaterialRequestFormProps {
  onSubmit: (items: MaterialRequestItem[], site: string) => void;
  onBack: () => void;
}

export function MaterialRequestForm({ onSubmit, onBack }: MaterialRequestFormProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedItems, setSelectedItems] = useState<Map<string, MaterialRequestItem>>(new Map());
  const [showSearch, setShowSearch] = useState(false);

  const filteredItems = ironItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectItem = (item: IronItem, checked: boolean) => {
    const newSelected = new Map(selectedItems);
    if (checked) {
      newSelected.set(item.id, {
        id: crypto.randomUUID(),
        itemId: item.id,
        itemName: item.name,
        itemImage: item.image,
        goodQuantity: 0,
        badQuantity: 0,
        remarks: "",
      });
    } else {
      newSelected.delete(item.id);
    }
    setSelectedItems(newSelected);
  };

  const updateQuantity = (itemId: string, type: "good" | "bad", delta: number) => {
    const newSelected = new Map(selectedItems);
    const item = newSelected.get(itemId);
    if (item) {
      if (type === "good") {
        item.goodQuantity = Math.max(0, item.goodQuantity + delta);
      } else {
        item.badQuantity = Math.max(0, item.badQuantity + delta);
      }
      newSelected.set(itemId, { ...item });
      setSelectedItems(newSelected);
    }
  };

  const updateRemarks = (itemId: string, remarks: string) => {
    const newSelected = new Map(selectedItems);
    const item = newSelected.get(itemId);
    if (item) {
      item.remarks = remarks;
      newSelected.set(itemId, { ...item });
      setSelectedItems(newSelected);
    }
  };

  const removeItem = (itemId: string) => {
    const newSelected = new Map(selectedItems);
    newSelected.delete(itemId);
    setSelectedItems(newSelected);
  };

  const handleSubmit = () => {
    if (!selectedSite) {
      toast({
        title: "No site selected",
        description: "Please select a site",
        variant: "destructive",
      });
      return;
    }
    if (selectedItems.size === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item",
        variant: "destructive",
      });
      return;
    }
    const siteName = sites.find(s => s.id === selectedSite)?.name || selectedSite;
    onSubmit(Array.from(selectedItems.values()), selectedSite);
    toast({
      title: "Request submitted",
      description: `${selectedItems.size} item(s) for ${siteName}`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-10 w-10 sm:h-12 sm:w-12"
        >
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Material Request Form
        </h1>
      </div>

      {/* Site Selection Dropdown */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          <MapPin className="inline h-4 w-4 mr-1" />
          Select Site
        </label>
        <Select value={selectedSite} onValueChange={setSelectedSite}>
          <SelectTrigger className="w-full bg-card border-border">
            <SelectValue placeholder="Choose a site..." />
          </SelectTrigger>
          <SelectContent className="bg-card border-border z-50">
            {sites.map((site) => (
              <SelectItem key={site.id} value={site.id}>
                {site.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Add Items Button & Search */}
      <div className="mb-4 sm:mb-6">
        <Button
          onClick={() => setShowSearch(!showSearch)}
          className="w-full sm:w-auto mb-3"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Items
        </Button>

        {showSearch && (
          <Card className="p-3 sm:p-4 mt-3 bg-card border-border">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onCheckedChange={(checked) =>
                      handleSelectItem(item, checked as boolean)
                    }
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
                  />
                  <span className="text-sm sm:text-base font-medium text-foreground flex-1">
                    {item.name}
                  </span>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No items found
                </p>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Selected Items */}
      {selectedItems.size > 0 && (
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Selected Items ({selectedItems.size})
          </h2>
          {Array.from(selectedItems.values()).map((item) => (
            <Card key={item.id} className="p-3 sm:p-4 bg-card border-border">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={item.itemImage}
                  alt={item.itemName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">
                      {item.itemName}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.itemId)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3">
                {/* Good Quantity */}
                <div className="bg-emerald-500/10 rounded-lg p-2 sm:p-3">
                  <p className="text-xs sm:text-sm text-emerald-600 font-medium mb-2">
                    Good Condition
                  </p>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.itemId, "good", -1)}
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <span className="text-lg sm:text-xl font-bold text-emerald-600">
                      {item.goodQuantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.itemId, "good", 1)}
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>

                {/* Bad Quantity */}
                <div className="bg-red-500/10 rounded-lg p-2 sm:p-3">
                  <p className="text-xs sm:text-sm text-red-600 font-medium mb-2">
                    Bad Condition
                  </p>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.itemId, "bad", -1)}
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <span className="text-lg sm:text-xl font-bold text-red-600">
                      {item.badQuantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.itemId, "bad", 1)}
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <Textarea
                placeholder="Add remarks..."
                value={item.remarks}
                onChange={(e) => updateRemarks(item.itemId, e.target.value)}
                className="text-sm"
                rows={2}
              />
            </Card>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="flex-1" disabled={selectedItems.size === 0}>
          Submit Request
        </Button>
      </div>
    </div>
  );
}
