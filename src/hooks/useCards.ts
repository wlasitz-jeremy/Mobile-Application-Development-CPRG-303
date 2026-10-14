import { useEffect, useState } from "react";
import { getCards } from "../api/cards";
import { Card } from "../types/Card";

export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCards();
  }, []);

  async function loadCards() {
    try {
      const data = await getCards();
      setCards(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    cards,
    loading,
    refreshCards: loadCards,
  };
}
