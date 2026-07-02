"use client";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useSelector } from "react-redux";

import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { tutorService } from "@/services/tutor.service";
import type { RootState } from "@/store";

/* ---------------- schema (UI unchanged) ---------------- */
const tutorProfileSchema = z.object({
    languages_spoken: z.string().min(2),
    country: z.string().min(2),
    subjects: z.string().min(2),
    phone_number: z.string().min(5),
    bio: z.string().min(10),
    teaching_style: z.string().min(2),
    expectation: z.string().min(2),
    description: z.string(),
    intro_video_url: z.string(),
    profile_picture: z.any().optional(),
    intro_video_file: z.any().optional(),
});

type TutorProfileValues = z.infer<typeof tutorProfileSchema>;

export function TutorProfileForm() {
    const router = useRouter();

    const user = useSelector((state: RootState) => state.auth.user);

    const form = useForm<TutorProfileValues>({
        resolver: zodResolver(tutorProfileSchema),
        defaultValues: {
            languages_spoken: "",
            country: "",
            subjects: "",
            phone_number: "",
            bio: "",
            teaching_style: "",
            expectation: "",
            description: "",
            intro_video_url: "",
            profile_picture: undefined,
            intro_video_file: undefined,
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: TutorProfileValues) => {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                if (value instanceof FileList) {
                    if (value[0]) formData.append(key, value[0]);
                } else {
                    formData.append(key, String(value || ""));
                }
            });

            /* ---------------- FIX اصلی اینجاست ---------------- */
            const tutorId = user?.tutor_id;

            if (!tutorId) {
                throw new Error("Tutor ID not found");
            }

            return tutorService.updateProfile(tutorId, formData);
        },

        onSuccess: () => {
            toast.success("پروفایل استاد ثبت شد و در انتظار تایید است.");

            // 👇 صفحه pending
            router.replace("/dashboard/tutor/pending");
            router.refresh();
        },

        onError: (error) => {
            toast.error(getApiErrorMessage(error));
        },
    });

    return (
        <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

            <form
                className="grid gap-5"
                onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
            >

                <div className="grid gap-4 md:grid-cols-2">
                    <input {...form.register("languages_spoken")} placeholder="languages" />
                    <input {...form.register("country")} placeholder="country" />
                    <input {...form.register("subjects")} placeholder="subjects" />
                    <input {...form.register("phone_number")} placeholder="phone" />
                </div>

                <textarea {...form.register("bio")} placeholder="bio" />
                <input {...form.register("teaching_style")} placeholder="style" />
                <input {...form.register("expectation")} placeholder="expectation" />
                <textarea {...form.register("description")} placeholder="description" />
                <input {...form.register("intro_video_url")} placeholder="video url" />

                <input type="file" {...form.register("profile_picture")} />
                <input type="file" {...form.register("intro_video_file")} />

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="rounded-full bg-indigo-600 px-6 py-3 text-white"
                >
                    {mutation.isPending ? "در حال ارسال..." : "ارسال پروفایل"}
                </button>

            </form>
        </div>
    );
}