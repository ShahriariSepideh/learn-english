import { api } from "@/lib/api";
import type {
  AuthUser,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/types/auth";

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post("/login/", payload);

    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthUser> {
    const { data } = await api.post("/register/", payload);
    return data;
  },

  async me(): Promise<AuthUser> {
    const { data } = await api.get("/me/");
    return data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    await api.post("/logout/");
  },
};