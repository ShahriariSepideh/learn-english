import { api } from "@/lib/api";
import { getListFromResponse } from "@/lib/api-response";
import type { BlogPost } from "@/types/blog";

export const blogService = {
  getAll: async (): Promise<BlogPost[]> => {
    const response = await api.get<BlogPost[] | { results?: BlogPost[] }>("/blogs/");
    return getListFromResponse(response.data);
  },

  getById: async (id: number | string): Promise<BlogPost> => {
    const response = await api.get<BlogPost>(`/blogs/${id}/`);
    return response.data;
  },
};
