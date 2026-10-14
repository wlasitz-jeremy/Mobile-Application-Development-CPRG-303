import { apiFetch } from "./client";

export const getDecks = () =>
  apiFetch("/decks");

export const createDeck = (
  deckName: string
) =>
  apiFetch("/decks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deckName,
    }),
  });

export const updateDeck = (id: number, deckName: string) =>
  apiFetch(`/decks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deckName,
    }),
  });

export const deleteDeck = (id: number) =>
  apiFetch(`/decks/${id}`, {
    method: "DELETE",
  });
  