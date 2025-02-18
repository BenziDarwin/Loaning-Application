import { AxiosInstance } from "../baseUrl";

// Get all permissions
export const getPermissions = async () => {
  try {
    let response = await AxiosInstance.get("permissions");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch permissions: " + error);
  }
};

// Get a specific permission by ID
export const getPermissionById = async (id: number) => {
  try {
    let response = await AxiosInstance.get(`permissions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch permission: " + error);
  }
};

// Create a new permission
export const createPermission = async (permission: any) => {
  try {
    let response = await AxiosInstance.post("permissions", permission);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create permission: " + error);
  }
};

// Update an existing permission
export const updatePermission = async (id: number, permission: any) => {
  try {
    let response = await AxiosInstance.put(`permissions/${id}`, permission);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update permission: " + error);
  }
};

// Delete a permission by ID
export const deletePermission = async (id: number) => {
  try {
    await AxiosInstance.delete(`permissions/${id}`);
  } catch (error) {
    throw new Error("Failed to delete permission: " + error);
  }
};
