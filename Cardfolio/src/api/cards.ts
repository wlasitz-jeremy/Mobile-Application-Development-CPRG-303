import { apiFetch } from "./client";

export const getCards = () =>
  apiFetch("/cards");

export const getCard = (id: number) =>
  apiFetch(`/cards/${id}`);

export const createCard = (card: any) =>
  apiFetch("/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

export const updateCard = (id: number, card: any) =>
  apiFetch(`/cards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

export const deleteCard = (id: number) =>
  apiFetch(`/cards/${id}`, {
    method: "DELETE",
  });
  