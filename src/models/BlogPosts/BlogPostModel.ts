export interface BlogPostModel {
  title: string;
  image?: string;
  imageDetails?: string;
  excerpt: string;
  date: string;
  slug: string;
  isFeatured: boolean;
  content: string;
  readTime?: number;
  keywords?: string;
  labels?: string[];
}
