import { User } from "@/types/users";
import { AxiosInstance } from "../baseUrl";

export const getUsers = async (): Promise<User[]> => {
  try {
    let response = await AxiosInstance.get("users");
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    let response = await AxiosInstance.get(`users/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createUser = async (data: any): Promise<User> => {
  try {
    let response = await AxiosInstance.post("users", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUser = async (
  id: number,
  data: any,
): Promise<User | null> => {
  try {
    let response = await AxiosInstance.put(`users/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    let response = await AxiosInstance.delete(`users/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
