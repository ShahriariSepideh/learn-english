import { publicApi } from "@/lib/api";
import { getListFromResponse } from "@/lib/api-response";
import type { Course } from "@/types/course";

export const coursesService = {
  getAll: async (): Promise<Course[]> => {
    const { data } = await publicApi.get("/courses/");
    return getListFromResponse(data);
  },

  getById: async (id: number | string): Promise<Course> => {
    const { data } = await publicApi.get(`/courses/${id}/`);
    return data;
  },
};