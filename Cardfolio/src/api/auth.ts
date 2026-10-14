import { apiFetch } from "./client";

export const login = (
  username: string,
  password: string
) =>
  apiFetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });
export const register = (
  username: string,
  password: string
) =>
  apiFetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  