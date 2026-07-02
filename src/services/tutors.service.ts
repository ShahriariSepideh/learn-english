import { publicApi } from "@/lib/api";
import { getListFromResponse } from "@/lib/api-response";
import type { Tutor } from "@/types/tutor";

export const tutorsService = {
  getAll: async (): Promise<Tutor[]> => {
    const { data } = await publicApi.get("/tutors/");
    return getListFromResponse(data);
  },

  getById: async (id: number | string): Promise<Tutor> => {
    const { data } = await publicApi.get(`/tutors/${id}/`);
    return data;
  },
};