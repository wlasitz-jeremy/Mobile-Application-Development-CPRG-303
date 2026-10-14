export interface Game {
  gameId: number;
  gameName: string;
  category: "TCG" | "SPORTS";
  active: boolean;
}
