import { api } from "@/lib/api";
import type { Enrollment } from "@/types/student";

export interface EnrollmentPayload {
  course: number | string;
}

export const enrollmentsService = {
  create: async (payload: EnrollmentPayload): Promise<Enrollment> => {
    const response = await api.post("/enrollments/", payload);
    return response.data;
  },
};
