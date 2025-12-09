import acroFarma from "@/assets/acro-farma.jpg";
import alphadeck from "@/assets/alphadeck.jpg";
import angle from "@/assets/angle.jpg";
import beamBracket from "@/assets/beam-bracket.jpg";
import { IronItem, Category } from "@/types/inventory";

export const categories: Category[] = [
  { id: "all", name: "All Items", icon: "📦" },
  { id: "props", name: "Props", icon: "🔧" },
  { id: "decks", name: "Decks", icon: "📦" },
  { id: "angles", name: "Angles", icon: "📐" },
  { id: "brackets", name: "Brackets", icon: "🔩" },
];

export const ironItems: IronItem[] = [
  {
    id: "1",
    name: "ACRO FARMA - 100 X 1500 MM",
    category: "props",
    image: acroFarma,
    batchSize: 1000,
    goodCount: 0,
    brokenCount: 0,
    description: "Heavy-duty adjustable prop, 100x1500mm",
  },
  {
    id: "2",
    name: "ALPHADECK 1200 X 1300",
    category: "decks",
    image: alphadeck,
    batchSize: 1000,
    goodCount: 0,
    brokenCount: 0,
    description: "Steel deck panel, 1200x1300mm",
  },
  {
    id: "3",
    name: "ANGLE",
    category: "angles",
    image: angle,
    batchSize: 1000,
    goodCount: 0,
    brokenCount: 0,
    description: "L-shaped steel angle iron",
  },
  {
    id: "4",
    name: "BEAM BOTTOM BRACKET 1.2MTR",
    category: "brackets",
    image: beamBracket,
    batchSize: 1000,
    goodCount: 0,
    brokenCount: 0,
    description: "Structural beam bracket, 1.2 meter",
  },
];
