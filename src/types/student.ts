import type { Course } from "@/types/course";

export type EnrollmentStatus = "pending" | "approved" | "rejected";

export interface StudentProfile {
  id: number | string;
  name?: string;
  full_name?: string;
  email?: string;
  age?: number | string;
  language_level?: string;
  level?: string;
  phone?: string;
}

export interface Enrollment {
  id: number | string;
  course?: Course;
  course_id?: number | string;
  status: EnrollmentStatus;
  payment_status?: EnrollmentStatus | string;
  created_at?: string;
}

export interface StudentDashboard {
  profile?: StudentProfile;
  enrollments?: Enrollment[];
  courses?: Course[];
  payments?: Enrollment[];
  homeworks?: unknown[];
  progress?: number;
}

export interface StudentProfilePayload {
  name?: string;
  full_name?: string;
  age?: number | string;
  language_level?: string;
  level?: string;
  phone?: string;
}
