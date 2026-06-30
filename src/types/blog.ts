export interface BlogPost {
  id: number | string;
  title: string;
  summary?: string;
  content?: string;
  author?: string;
  created_at?: string;
  published_at?: string;
  image?: string;
}
