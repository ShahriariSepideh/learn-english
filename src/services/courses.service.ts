import { api } from "@/lib/api";
import type { Course, CoursePayload } from "@/types/course";

export const coursesService = {
  getAll: async (): Promise<Course[]> => {
    const response = await api.get("/courses/");
    return response.data;
  },

  getById: async (id: number | string): Promise<Course> => {
    const response = await api.get(`/courses/${id}/`);
    return response.data;
  },

  create: async (payload: CoursePayload): Promise<Course> => {
    const response = await api.post("/courses/", payload);
    return response.data;
  },

  update: async (
    id: number | string,
    payload: Partial<CoursePayload>,
  ): Promise<Course> => {
    const response = await api.patch(`/courses/${id}/`, payload);
    return response.data;
  },

  remove: async (id: number | string) => {
    const response = await api.delete(`/courses/${id}/`);
    return response.data;
  },
};
