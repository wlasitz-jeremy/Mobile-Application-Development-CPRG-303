import { useEffect, useState } from "react";
import { getDecks } from "../api/decks";
import { Deck } from "../types/Deck";

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDecks();
  }, []);

  async function loadDecks() {
    try {
      const data = await getDecks();
      setDecks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    decks,
    loading,
    refreshDecks: loadDecks,
  };
}
