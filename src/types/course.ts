export interface Course {
  id: number | string;
  title: string;
  description?: string;
  short_description?: string;
  thumbnail?: string;
  image?: string;
  level?: string;
  category?: string;
  status?: string;
  tutor?: {
    id: number | string;
    name?: string;
    full_name?: string;
    email?: string;
  };
  teacher?: string;
  price?: number | string;
  created_at?: string;
}

export interface CoursePayload {
  title: string;
  description?: string;
  level?: string;
  category?: string;
  price?: number | string;
}
