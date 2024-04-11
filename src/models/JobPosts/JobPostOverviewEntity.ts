import { TagEntity } from '../tags/TagEntity';

export type JobPostOverviewEntity = {
  id: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  title: string;
  location: string;
  isHighlighted: boolean;
  color: string;
  isPremium: boolean;
  slug: string;
  created_at: string;
  updated_at: string;

  tags: TagEntity[];
  company: {
    id: string;
    name: string;
    logoImage: string;
  };
};
