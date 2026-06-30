export type UserRole = "student" | "tutor" | "admin";

export interface AuthUser {
  id: number | string;
  name?: string;
  full_name?: string;
  email: string;
  role: UserRole;
  approved_is?: boolean;
  is_approved?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "student" | "tutor";
}
