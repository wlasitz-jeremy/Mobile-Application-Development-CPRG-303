export type CardCondition =
  | "Mint"
  | "Near Mint"
  | "Lightly Played"
  | "Moderately Played"
  | "Heavily Played"
  | "Damaged";

export interface Card {
  cardId: number;
  userId: number;
  gameId: number;
  name: string;
  setCode?: string;
  setName?: string;
  collectorNumber?: string;
  rarity?: string;
  quantity: number;
  cardCondition?: CardCondition;
}
