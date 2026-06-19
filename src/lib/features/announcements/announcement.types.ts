export type AnnouncementItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  link?: string | null;
  priority: boolean;
  isActive: boolean;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AnnouncementPayload = {
  title: string;
  slug?: string;
  category: string;
  link?: string | null;
  priority?: boolean;
  isActive?: boolean;
  publishedAt: string;
};
