export interface CourseTutor {
  id: number | string;
  user?: number | string;
  profile_picture?: string | null;
  languages_spoken?: unknown;
  subjects?: string[];
}

export interface Course {
  id: number;
  courseId?: string;
  title: string;
  description?: string;
  detail?: string;
  requirements?: string;
  materials?: string;
  price_per_hour?: string;
  price_per_dollar?: string;
  price_per_toman?: string;
  language?: string;
  level?: string;
  schedule_day?: string;
  schedule_start?: string;
  schedule_end?: string;
  capacity?: number;
  active_students?: number;
  length?: number;
  course_duration?: number;
  image?: string | null;
  language_flag?: string | null;
  lessons?: unknown[];
  tutor?: CourseTutor;
}

export interface CoursePayload {
  title: string;
  language: string;
  level: string;
  schedule_day: string;
  schedule_start: string;
  schedule_end: string;
  capacity: number;
  description?: string;
  detail?: string;
  requirements?: string;
  materials?: string;
  price_per_hour?: string;
  price_per_dollar?: string;
  price_per_toman?: string;
  length?: number;
  course_duration?: number;
  image?: File | null;
  language_flag?: File | null;
}
