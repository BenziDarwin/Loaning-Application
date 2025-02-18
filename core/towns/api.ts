import { Town } from "@/types/members";
import { AxiosInstance } from "../baseUrl"; // import your AxiosInstance setup

// Get a list of all towns
export const getTowns = async (): Promise<Town[]> => {
  try {
    let response = await AxiosInstance.get("towns");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch towns: " + error);
  }
};

// Get a single town by ID
export const getTownById = async (id: number) => {
  try {
    let response = await AxiosInstance.get(`towns/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch town: " + error);
  }
};

// Create a new town
export const createTown = async (
  name: string,
  nickname: string | null,
  collectorId: number,
  loanPortfolio: number,
  profilePicture: string | null,
) => {
  try {
    const response = await AxiosInstance.post("towns", {
      name,
      nickname,
      collectorId,
      loanPortfolio,
      profilePicture,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create town: " + error);
  }
};

// Update an existing town
export const updateTown = async (
  id: number,
  name: string,
  nickname: string | null,
  collectorId: number,
  loanPortfolio: number,
  profilePicture: string | null,
) => {
  try {
    const response = await AxiosInstance.put(`towns/${id}`, {
      name,
      nickname,
      collectorId,
      loanPortfolio,
      profilePicture,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update town: " + error);
  }
};

// Delete a town
export const deleteTown = async (id: number) => {
  try {
    await AxiosInstance.delete(`towns/${id}`);
  } catch (error) {
    throw new Error("Failed to delete town: " + error);
  }
};
