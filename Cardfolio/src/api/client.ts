const API_URL = "http://192.168.1.100:8080/api";

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    options
  );

  if (!response.ok) {
    throw new Error("API Request Failed");
  }

  return response.json();
}
