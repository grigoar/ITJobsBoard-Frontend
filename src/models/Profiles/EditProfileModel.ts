type EmploymentEntry = {
  title: string;
  company: string;
  startYear: number;
  endYear: number;
  url?: string;
};

type EducationEntry = {
  title: string;
  institution: string;
  url?: string;
  startYear?: number;
  endYear?: number;
};

type SideProjectEntry = {
  title: string;
  description: string;
  url?: string;
  startYear?: number;
  endYear?: number;
};

export type EditMyProfileModel = {
  firstName?: string;
  lastName?: string;
  location?: string;
  nationality?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  bio?: string;
  phoneNumber?: string;
  languages?: string[];
  preferredMinHourRate?: number;
  employments?: EmploymentEntry[];
  educations?: EducationEntry[];
  sideProjects?: SideProjectEntry[];
};
