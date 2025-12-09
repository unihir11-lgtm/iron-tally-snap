export interface MaterialRequestItem {
  id: string;
  itemId: string;
  itemName: string;
  itemDescription: string;
  itemGroup: string;
  itemImage: string;
  goodQuantity: number;
  badQuantity: number;
}

export interface MaterialRequest {
  id: string;
  siteId: string;
  siteName: string;
  items: MaterialRequestItem[];
  remarks: string;
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
}
