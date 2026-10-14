import { useEffect, useState } from "react";
import { getGames } from "../api/games";
import { Game } from "../types/Game";

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    try {
      const data = await getGames();
      setGames(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    games,
    loading,
    refreshGames: loadGames,
  };
}
