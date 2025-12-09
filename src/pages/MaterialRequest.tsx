import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { MaterialRequestForm } from "@/components/MaterialRequestForm";
import { MaterialRequestList } from "@/components/MaterialRequestList";
import { MaterialRequest, MaterialRequestItem } from "@/types/materialRequest";
import { useNavigate } from "react-router-dom";

type View = "list" | "form";

export default function MaterialRequestPage() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<View>("list");
  const [requests, setRequests] = useState<MaterialRequest[]>([]);

  const handleSubmitRequest = (items: MaterialRequestItem[], siteId: string, remarks: string) => {
    const sites: Record<string, string> = {
      "site-1": "Site A - Main Factory",
      "site-2": "Site B - Warehouse",
      "site-3": "Site C - Assembly Unit",
      "site-4": "Site D - Storage Yard",
    };
    const newRequest: MaterialRequest = {
      id: crypto.randomUUID(),
      siteId,
      siteName: sites[siteId] || siteId,
      items,
      remarks,
      createdAt: new Date(),
      status: "pending",
    };
    setRequests([newRequest, ...requests]);
    setCurrentView("list");
  };

  const handleDeleteRequest = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  if (currentView === "form") {
    return (
      <MaterialRequestForm
        onSubmit={handleSubmitRequest}
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
            Material Requests
          </h1>
        </div>
        <Button onClick={() => setCurrentView("form")} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add
        </Button>
      </div>

      {/* List View */}
      <MaterialRequestList
        requests={requests}
        onDelete={handleDeleteRequest}
      />
    </div>
  );
}
