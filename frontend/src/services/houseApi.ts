import { API_BASE_URL } from "lib/config";
import { House } from "types/house";

export async function fetchHouses(city?: string, houseType?: string): Promise<House[]> {
  const params = new URLSearchParams();
  if (city) params.set("city", city);
  if (houseType) params.set("house_type", houseType);

  try {
    const response = await fetch(`${API_BASE_URL}/houses?${params.toString()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createHouse(payload: House): Promise<House | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/houses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Create failed: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
