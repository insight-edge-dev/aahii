export interface NewsArticle {
  id: string;
  slug?: string;
  source: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
  publishedAt: string;
  featured?: boolean;
}
