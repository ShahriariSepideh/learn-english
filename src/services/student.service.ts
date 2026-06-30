import { api } from "@/lib/api";
import type {
  StudentDashboard,
  StudentProfile,
  StudentProfilePayload,
} from "@/types/student";

export const studentService = {
  getProfile: async (): Promise<StudentProfile> => {
    const response = await api.get("/students/me/");
    return response.data;
  },

  updateProfile: async (
    payload: StudentProfilePayload,
  ): Promise<StudentProfile> => {
    const response = await api.patch("/students/me/profile/", payload);
    return response.data;
  },

  getDashboard: async (): Promise<StudentDashboard> => {
    const response = await api.get("/students/me/dashboard/");
    return response.data;
  },
};
