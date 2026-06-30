import { api } from "@/lib/api";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

export const authService = {
  register: async (payload: RegisterPayload) => {
    const response = await api.post("/register/", payload);
    return response.data;
  },

  login: async (payload: LoginPayload) => {
    const response = await api.post("/login/", payload);
    return response.data;
  },

  me: async (): Promise<AuthUser> => {
    const response = await api.get("/me/");
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/logout/");
    return response.data;
  },
};
