export interface Tutor {
  id: number | string;
  name?: string;
  full_name?: string;
  email?: string;
  languages?: string[] | string;
  bio?: string;
  short_bio?: string;
  experience?: string;
  education?: string;
  video?: string;
  profile_video?: string;
  approved_is?: boolean;
  is_approved?: boolean;
  rating?: number;
  students_count?: number;
  active_courses_count?: number;
}

export interface TutorProfilePayload {
  languages?: string[] | string;
  bio?: string;
  short_bio?: string;
  experience?: string;
  education?: string;
  video?: File | null;
}
