import { Member } from "@/types/members";
import { AxiosInstance } from "../baseUrl";

// Create a new member
export const createMember = async (memberData: any) => {
  try {
    const response = await AxiosInstance.post("members", memberData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create member: " + error);
  }
};

// Get all members
export const getAllMembers = async (): Promise<Member[]> => {
  try {
    const response = await AxiosInstance.get("members");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch members: " + error);
  }
};

// Get a member by ID
export const getMemberById = async (id: number) => {
  try {
    const response = await AxiosInstance.get(`members/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch member: " + error);
  }
};

// Update a member by ID
export const updateMember = async (id: number, memberData: any) => {
  try {
    const response = await AxiosInstance.put(`members/${id}`, memberData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update member: " + error);
  }
};

// Delete a member by ID
export const deleteMember = async (id: number) => {
  try {
    await AxiosInstance.delete(`members/${id}`);
  } catch (error) {
    throw new Error("Failed to delete member: " + error);
  }
};
