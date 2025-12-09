export interface InwardItem {
  id: string;
  itemId: string;
  itemName: string;
  itemDescription: string;
  itemGroup: string;
  itemImage: string;
  goodQuantity: number;
  badQuantity: number;
}

export interface Inward {
  id: string;
  siteId: string;
  siteName: string;
  items: InwardItem[];
  remarks: string;
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
}
