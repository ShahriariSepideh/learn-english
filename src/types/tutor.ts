export interface TutorUser {
  id: number | string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export type TutorLanguage =
  | string
  | {
      language?: string;
      level?: string;
    };

export interface Tutor {
  id: number | string;
  user?: TutorUser;
  profile_picture?: string | null;
  languages_spoken?: TutorLanguage[] | Record<string, string>;
  country?: string;
  subjects?: string[];
  phone_number?: string;
  bio?: string;
  teaching_style?: string;
  expectation?: string;
  description?: string;
  intro_video_url?: string;
  intro_video_file?: string | null;
  certificates?: unknown[];
  educations?: unknown[];
  experiences?: unknown[];
  courses?: unknown[];
}

export interface TutorProfilePayload {
  languages_spoken?: TutorLanguage[] | Record<string, string>;
  country?: string;
  subjects?: string[];
  phone_number?: string;
  bio?: string;
  teaching_style?: string;
  expectation?: string;
  description?: string;
  intro_video_url?: string;
  intro_video_file?: File | null;
  profile_picture?: File | null;
}
