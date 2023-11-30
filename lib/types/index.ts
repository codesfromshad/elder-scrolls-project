export interface MagicthegatheringAPIResponse {
  cards?: CardsEntity[] | null;
}
export interface CardsEntity {
  name: string;
  manaCost: string;
  cmc: number;
  colors?: string[] | null;
  colorIdentity?: string[] | null;
  type: string;
  types?: string[] | null;
  subtypes?: string[] | null;
  rarity: string;
  set: string;
  setName: string;
  text: string;
  artist: string;
  number: string;
  power: string;
  toughness: string;
  layout: string;
  multiverseid: string;
  imageUrl: string;
  variations?: string[] | null;
  foreignNames?: ForeignNamesEntity[] | null;
  printings?: string[] | null;
  originalText: string;
  originalType: string;
  legalities?: LegalitiesEntity[] | null;
  id: string;
  flavor?: string | null;
}
export interface ForeignNamesEntity {
  name: string;
  text: string;
  type: string;
  flavor: string;
  imageUrl: string;
  language: string;
  multiverseid: number;
}
export interface LegalitiesEntity {
  format: string;
  legality: string;
}
