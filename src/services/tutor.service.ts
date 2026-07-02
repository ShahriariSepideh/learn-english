import { api } from "@/lib/api";

export const tutorService = {
    async getDashboard() {
        const { data } = await api.get("/tutors/my_dashboard/");
        return data;
    },

    async updateProfile(tutorId: number | string, payload: FormData) {
        const { data } = await api.patch(
            `/tutors/${tutorId}/`,
            payload,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return data;
    },
};