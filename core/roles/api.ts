import { Role } from "@/types/roles";
import { AxiosInstance } from "../baseUrl";

export const getRoles = async (): Promise<Role[]> => {
  try {
    let response = await AxiosInstance.get("roles");
    return response.data;
  } catch (error) {
    throw new Error("Failed tp fetch roles: " + error);
  }
};

export const getRole = async (id: number): Promise<Role> => {
  try {
    let response = await AxiosInstance.get(`roles/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch role: " + error);
  }
};

export const createRole = async (roleData: any) => {
  try {
    let response = await AxiosInstance.post("roles", roleData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create role: " + error);
  }
};

export const updateRole = async (id: number, roleData: any) => {
  try {
    let response = await AxiosInstance.put(`roles/${id}`, roleData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update role: " + error);
  }
};

export const deleteRole = async (id: number) => {
  try {
    let response = await AxiosInstance.delete(`roles/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete role: " + error);
  }
};

export const addPermissionsToRole = async (
  roleId: number,
  permissions: any[],
) => {
  try {
    let response = await AxiosInstance.post(
      `roles/${roleId}/permissions`,
      permissions,
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add permissions to role: " + error);
  }
};

export const removePermissionsFromRole = async (
  roleId: number,
  permissions: any[],
) => {
  try {
    let response = await AxiosInstance.delete(`roles/${roleId}/permissions`, {
      data: permissions,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to remove permissions from role: " + error);
  }
};
