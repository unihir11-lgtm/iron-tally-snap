import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Plus, List, ArrowLeft } from "lucide-react";
import { MaterialRequestForm } from "@/components/MaterialRequestForm";
import { MaterialRequestList } from "@/components/MaterialRequestList";
import { MaterialRequest, MaterialRequestItem } from "@/types/materialRequest";
import { useNavigate } from "react-router-dom";

type View = "menu" | "form" | "list";

export default function MaterialRequestPage() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<View>("menu");
  const [requests, setRequests] = useState<MaterialRequest[]>([]);

  const handleSubmitRequest = (items: MaterialRequestItem[]) => {
    const newRequest: MaterialRequest = {
      id: crypto.randomUUID(),
      items,
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
        onBack={() => setCurrentView("menu")}
      />
    );
  }

  if (currentView === "list") {
    return (
      <MaterialRequestList
        requests={requests}
        onBack={() => setCurrentView("menu")}
        onDelete={handleDeleteRequest}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      {/* Header with Dropdown Menu */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
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
            Material Request
          </h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 sm:h-12 sm:w-12">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setCurrentView("form")}>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrentView("list")}>
              <List className="h-4 w-4 mr-2" />
              View Requests
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inventory
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mt-8">
        <Button
          onClick={() => setCurrentView("form")}
          size="lg"
          className="h-24 sm:h-32 flex flex-col gap-2"
        >
          <Plus className="h-8 w-8" />
          <span className="text-base sm:text-lg">New Request</span>
        </Button>

        <Button
          variant="secondary"
          onClick={() => setCurrentView("list")}
          size="lg"
          className="h-24 sm:h-32 flex flex-col gap-2"
        >
          <List className="h-8 w-8" />
          <span className="text-base sm:text-lg">View Requests ({requests.length})</span>
        </Button>
      </div>
    </div>
  );
}
