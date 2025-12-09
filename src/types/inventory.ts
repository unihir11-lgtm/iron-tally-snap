export interface IronItem {
  id: string;
  name: string;
  category: string;
  image: string;
  batchSize: number;
  goodCount: number;
  brokenCount: number;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
