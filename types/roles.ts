import { Permission } from "@/types/permissions";

export interface Role {
  id: number;
  name: UserRole;
  description: string;
  permissions: Permission[];
}

export type UserRole = "ROLE_ADMIN" | "ROLE_LOAN_OFFICER" | "ROLE_USER";
export type UserStatus = "ACTIVE" | "INACTIVE";
