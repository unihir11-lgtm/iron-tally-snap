import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { InwardForm } from "@/components/InwardForm";
import { InwardList } from "@/components/InwardList";
import { Inward, InwardItem } from "@/types/inward";
import { useNavigate } from "react-router-dom";

type View = "list" | "form";

export default function InwardPage() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<View>("list");
  const [inwards, setInwards] = useState<Inward[]>([]);

  const handleSubmitInward = (items: InwardItem[], siteId: string, remarks: string) => {
    const sites: Record<string, string> = {
      "site-1": "Site A - Main Factory",
      "site-2": "Site B - Warehouse",
      "site-3": "Site C - Assembly Unit",
      "site-4": "Site D - Storage Yard",
    };
    const newInward: Inward = {
      id: crypto.randomUUID(),
      siteId,
      siteName: sites[siteId] || siteId,
      items,
      remarks,
      createdAt: new Date(),
      status: "pending",
    };
    setInwards([newInward, ...inwards]);
    setCurrentView("list");
  };

  const handleDeleteInward = (id: string) => {
    setInwards(inwards.filter((i) => i.id !== id));
  };

  if (currentView === "form") {
    return (
      <InwardForm
        onSubmit={handleSubmitInward}
        onBack={() => setCurrentView("list")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="h-10 w-10 sm:h-12 sm:w-12"
          >
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Inward
          </h1>
        </div>
        <Button onClick={() => setCurrentView("form")} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add
        </Button>
      </div>

      {/* List View */}
      <InwardList
        inwards={inwards}
        onDelete={handleDeleteInward}
      />
    </div>
  );
}
