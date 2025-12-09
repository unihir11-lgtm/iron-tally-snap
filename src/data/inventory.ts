import ironBolt from "@/assets/iron-bolt.jpg";
import ironNut from "@/assets/iron-nut.jpg";
import ironWasher from "@/assets/iron-washer.jpg";
import ironScrew from "@/assets/iron-screw.jpg";
import ironBracket from "@/assets/iron-bracket.jpg";
import ironChain from "@/assets/iron-chain.jpg";
import { IronItem, Category } from "@/types/inventory";

export const categories: Category[] = [
  { id: "all", name: "All Items", icon: "📦" },
  { id: "bolts", name: "Bolts", icon: "🔩" },
  { id: "nuts", name: "Nuts", icon: "⚙️" },
  { id: "washers", name: "Washers", icon: "⭕" },
  { id: "screws", name: "Screws", icon: "🪛" },
  { id: "brackets", name: "Brackets", icon: "📐" },
  { id: "chains", name: "Chains", icon: "⛓️" },
];

export const ironItems: IronItem[] = [
  {
    id: "1",
    name: "Hex Head Bolt M10",
    category: "bolts",
    image: ironBolt,
    batchSize: 1000,
    goodCount: 0,
    brokenCount: 0,
    description: "Heavy-duty hex bolt, 10mm diameter",
  },
  {
    id: "2",
    name: "Hex Nut M10",
    category: "nuts",
    image: ironNut,
    batchSize: 1000,
    goodCount: 0,
    brokenCount: 0,
    description: "Standard hex nut, 10mm thread",
  },
  {
    id: "3",
    name: "Flat Washer 10mm",
    category: "washers",
    image: ironWasher,
    batchSize: 1000,
    goodCount: 0,
    brokenCount: 0,
    description: "Flat washer for 10mm bolts",
  },
  {
    id: "4",
    name: "Socket Head Screw",
    category: "screws",
    image: ironScrew,
    batchSize: 1000,
    goodCount: 0,
    brokenCount: 0,
    description: "Allen socket head screw",
  },
  {
    id: "5",
    name: "Corner Bracket",
    category: "brackets",
    image: ironBracket,
    batchSize: 1000,
    goodCount: 0,
    brokenCount: 0,
    description: "Heavy-duty corner bracket",
  },
  {
    id: "6",
    name: "Chain Link 8mm",
    category: "chains",
    image: ironChain,
    batchSize: 1000,
    goodCount: 0,
    brokenCount: 0,
    description: "Industrial chain link, 8mm gauge",
  },
];
