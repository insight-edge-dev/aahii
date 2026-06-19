export type VacancyStatus = "DRAFT" | "OPEN" | "CLOSED";

export type VacancyItem = {
  id: string;
  title: string;
  slug: string;
  location: string;
  employmentType: string;
  department: string;
  description: string;
  applyEmail: string;
  advertisementUrl?: string | null;
  advertisementPublicId?: string | null;
  status: VacancyStatus;
  postedAt: string;
  applicationDeadline?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type VacancyPayload = {
  title: string;
  slug?: string;
  location: string;
  employmentType: string;
  department: string;
  description: string;
  applyEmail: string;
  status: VacancyStatus;
  postedAt: string;
  applicationDeadline?: string | null;
};
