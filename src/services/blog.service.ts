import { publicApi } from "@/lib/api";
import { getListFromResponse } from "@/lib/api-response";
import type { BlogPost } from "@/types/blog";

export const blogService = {
  getAll: async (): Promise<BlogPost[]> => {
    const { data } = await publicApi.get("/blogs/");
    return getListFromResponse(data);
  },

  getById: async (id: number | string): Promise<BlogPost> => {
    const { data } = await publicApi.get(`/blogs/${id}/`);
    return data;
  },
};