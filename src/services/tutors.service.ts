import { api } from "@/lib/api";
import type { Tutor } from "@/types/tutor";

export const tutorsService = {
  getAll: async (): Promise<Tutor[]> => {
    const response = await api.get("/tutors/");
    return response.data;
  },

  getById: async (id: number | string): Promise<Tutor> => {
    const response = await api.get(`/tutors/${id}/`);
    return response.data;
  },
};
