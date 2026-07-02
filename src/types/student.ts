import type { Course } from "@/types/course";

export interface StudentHomework {
  id: number | string;
  title?: string;
  due_date?: string;
  document?: string;
}

export interface StudentDashboardStudent {
  id: number | string;
  user: number | string;
  courses_list?: Course[];
  favourite_tutors?: Array<{
    id: number | string;
    user?: {
      first_name?: string;
      last_name?: string;
      email?: string;
    };
    profile_picture?: string | null;
  }>;
  student_active?: boolean;
  student_homework_completed?: StudentHomework[];
}

export interface StudentEnrollment {
  id: number | string;
  course?: {
    id?: number | string;
    title?: string;
  };
  status?: string;
  payment_amount?: string;
  currency?: string;
}

export interface StudentDashboard {
  student?: StudentDashboardStudent;
  enrollments?: StudentEnrollment[];
  approved_courses?: Course[];
}

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

export interface StudentProfilePayload {
  name?: string;
  full_name?: string;
  age?: number | string;
  language_level?: string;
  level?: string;
  phone?: string;
}