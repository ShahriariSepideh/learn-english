export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_teacher: boolean;
  profile_picture: string | null;
  has_tutor_profile: boolean;
  tutor_id: number | null;
  tutor_approved: boolean | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  ok: boolean;
  access?: string;
  refresh?: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_teacher: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}
