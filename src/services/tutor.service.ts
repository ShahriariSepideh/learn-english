import { api } from "@/lib/api";
import type { TutorProfilePayload } from "@/types/tutor";

export const tutorService = {
  getDashboard: async () => {
    const response = await api.get("/tutors/my_dashboard/");
    return response.data;
  },

  createProfile: async (payload: TutorProfilePayload) => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, String(item)));
        return;
      }

      formData.append(key, value instanceof File ? value : String(value));
    });

    const response = await api.post("/tutors/create_profile/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
