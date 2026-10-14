import { apiFetch } from "./client";

export const getGame = (id: number) =>
  apiFetch(`/games/${id}`);

export const createGame = (game: any) =>
  apiFetch("/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });

export const updateGame = (id: number, game: any) =>
  apiFetch(`/games/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });

export const deleteGame = (id: number) =>
  apiFetch(`/games/${id}`, {
    method: "DELETE",
  });
