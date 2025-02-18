import { Permission } from "@/types/permissions";

export interface Role {
  id?: number;
  name: UserRole;
  description: string;
  permissions: Permission[];
}

export type UserRole = string;
export type UserStatus = "ACTIVE" | "INACTIVE";
