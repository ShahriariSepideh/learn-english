import { api } from "@/lib/api";
import { getListFromResponse } from "@/lib/api-response";
import type { Tutor } from "@/types/tutor";

export const tutorsService = {
  getAll: async (): Promise<Tutor[]> => {
    const response = await api.get<Tutor[] | { results?: Tutor[] }>("/tutors/");
    return getListFromResponse(response.data);
  },

  getById: async (id: number | string): Promise<Tutor> => {
    const response = await api.get<Tutor>(`/tutors/${id}/`);
    return response.data;
  },
};
