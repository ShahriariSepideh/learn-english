import { api } from "@/lib/api";
import type {
  AuthUser,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/types/auth";

export const authService = {
  async login(payload: LoginPayload) {
    const response = await api.post<LoginResponse>("/login/", payload);
    return response.data;
  },

  async register(payload: RegisterPayload) {
    const response = await api.post<AuthUser>("/register/", payload);
    return response.data;
  },

  async me() {
    const response = await api.get<AuthUser>("/me/");
    return response.data;
  },

  async logout() {
    const response = await api.post("/logout/");
    return response.data;
  },
};