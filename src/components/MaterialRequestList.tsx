import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2, Clock, CheckCircle, XCircle } from "lucide-react";
import { MaterialRequest } from "@/types/materialRequest";
import { format } from "date-fns";

interface MaterialRequestListProps {
  requests: MaterialRequest[];
  onBack: () => void;
  onDelete: (id: string) => void;
}

export function MaterialRequestList({ requests, onBack, onDelete }: MaterialRequestListProps) {
  const getStatusBadge = (status: MaterialRequest["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-amber-500/20 text-amber-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-500/20 text-red-600">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
    }
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
          Material Requests
        </h1>
      </div>

      {requests.length === 0 ? (
        <Card className="p-8 text-center bg-card border-border">
          <p className="text-muted-foreground">No requests yet</p>
        </Card>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-3 sm:p-4 bg-card border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {format(new Date(request.createdAt), "MMM dd, yyyy HH:mm")}
                  </p>
                  <p className="font-semibold text-foreground">
                    {request.items.length} item(s)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(request.status)}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(request.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Item List */}
              <div className="space-y-2">
                {request.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg"
                  >
                    <img
                      src={item.itemImage}
                      alt={item.itemName}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.itemName}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-600">
                          Good: {item.goodQuantity}
                        </span>
                        <span className="text-red-600">
                          Bad: {item.badQuantity}
                        </span>
                      </div>
                      {item.remarks && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {item.remarks}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
