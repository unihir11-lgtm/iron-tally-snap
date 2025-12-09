export interface MaterialRequestItem {
  id: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  goodQuantity: number;
  badQuantity: number;
  remarks: string;
}

export interface MaterialRequest {
  id: string;
  siteId: string;
  siteName: string;
  items: MaterialRequestItem[];
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
}
