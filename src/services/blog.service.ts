import { api } from "@/lib/api";
import type { BlogPost } from "@/types/blog";

export const blogService = {
  getAll: async (): Promise<BlogPost[]> => {
    const response = await api.get("/blogs/");
    return response.data;
  },

  getById: async (id: number | string): Promise<BlogPost> => {
    const response = await api.get(`/blogs/${id}/`);
    return response.data;
  },
};
