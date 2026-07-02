import { api } from "@/lib/api";

export const enrollmentsService = {
  create: async (payload: FormData) => {
    const { data } = await api.post("/enrollments/", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  },
};