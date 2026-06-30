import { api } from "@/lib/api";
import { getListFromResponse } from "@/lib/api-response";
import type { Course, CoursePayload } from "@/types/course";

export const coursesService = {
  getAll: async (): Promise<Course[]> => {
    const response = await api.get<Course[] | { results?: Course[] }>("/courses/");
    return getListFromResponse(response.data);
  },

  getById: async (id: number | string): Promise<Course> => {
    const response = await api.get<Course>(`/courses/${id}/`);
    return response.data;
  },

  create: async (payload: CoursePayload): Promise<Course> => {
    const response = await api.post<Course>("/courses/", payload);
    return response.data;
  },

  update: async (
    id: number | string,
    payload: Partial<CoursePayload>,
  ): Promise<Course> => {
    const response = await api.patch<Course>(`/courses/${id}/`, payload);
    return response.data;
  },

  remove: async (id: number | string) => {
    const response = await api.delete(`/courses/${id}/`);
    return response.data;
  },
};
