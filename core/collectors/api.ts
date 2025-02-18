import { Collector } from "@/types/members";
import { AxiosInstance } from "../baseUrl"; // Assuming AxiosInstance is set up in baseUrl.ts

// Get all collectors
export const getCollectors = async () => {
  try {
    const response = await AxiosInstance.get("collectors");
    return response.data; // Return data (list of collectors)
  } catch (error) {
    throw new Error("Failed to fetch collectors: " + error);
  }
};

// Get a collector by ID
export const getCollectorById = async (id: number) => {
  try {
    const response = await AxiosInstance.get(`collectors/${id}`);
    return response.data; // Return the collector
  } catch (error) {
    throw new Error("Failed to fetch collector: " + error);
  }
};

// Create a new collector
export const createCollector = async (collector: Collector) => {
  try {
    const response = await AxiosInstance.post("collectors", collector);
    return response.data; // Return the created collector
  } catch (error) {
    throw new Error("Failed to create collector: " + error);
  }
};

// Update a collector by ID
export const updateCollector = async (collector: Collector) => {
  try {
    const response = await AxiosInstance.put(
      `collectors/${collector.id}`,
      collector,
    );
    return response.data; // Return the updated collector
  } catch (error) {
    throw new Error("Failed to update collector: " + error);
  }
};

// Delete a collector by ID
export const deleteCollector = async (id: number) => {
  try {
    await AxiosInstance.delete(`collectors/${id}`);
  } catch (error) {
    throw new Error("Failed to delete collector: " + error);
  }
};
