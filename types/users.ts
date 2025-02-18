import { Role } from "@/types/roles";

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  password?: string;
  roles: Role[];
}

export interface UserDetails {
  getAuthorities(): GrantedAuthority[];
  getPassword(): string;
  getUsername(): string;
}

export interface GrantedAuthority {
  authority: string;
}
