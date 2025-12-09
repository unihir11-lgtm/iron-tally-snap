import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Clock, CheckCircle, XCircle, MapPin } from "lucide-react";
import { Inward } from "@/types/inward";
import { format } from "date-fns";

interface InwardListProps {
  inwards: Inward[];
  onDelete: (id: string) => void;
}

export function InwardList({ inwards, onDelete }: InwardListProps) {
  const getStatusBadge = (status: Inward["status"]) => {
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
    <div>
      {inwards.length === 0 ? (
        <Card className="p-8 text-center bg-card border-border">
          <p className="text-muted-foreground">No inwards yet</p>
        </Card>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {inwards.map((inward) => (
            <Card key={inward.id} className="p-3 sm:p-4 bg-card border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-primary mb-1">
                    <MapPin className="h-3 w-3" />
                    <span className="font-medium">{inward.siteName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(inward.createdAt), "MMM dd, yyyy HH:mm")}
                  </p>
                  <p className="font-semibold text-foreground">
                    {inward.items.length} item(s)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(inward.status)}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(inward.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Item List */}
              <div className="space-y-2">
                {inward.items.map((item) => (
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
                    </div>
                  </div>
                ))}
              </div>
              {inward.remarks && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Remarks:</span> {inward.remarks}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
