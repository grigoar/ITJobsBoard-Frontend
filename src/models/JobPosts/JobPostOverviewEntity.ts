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
  created_at: string;
  updated_at: string;
  tags: {
    id: string;
    name: string;
    type: string;
    labelName: string;
  }[];
  company: {
    id: string;
    name: string;
    logoImage: string;
  };
};
