import { api } from "@/lib/api";

export const studentService = {
  getProfile: async () => {
    const { data } = await api.get("/students/me/");
    return data;
  },

  getDashboard: async () => {
    const { data } = await api.get("/students/me/dashboard/");
    return data;
  },
};