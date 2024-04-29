export type JobPostEntity = {
  id: string;
  profile_id: string;
  description: string;
  title: string;
  salary?: number;
  location: string;
  isHighlighted: boolean;
  color?: string;
  isPremium: boolean;
  company_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
