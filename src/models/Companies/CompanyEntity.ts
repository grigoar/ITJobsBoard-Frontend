export type CompanyEntity = {
  id: string;
  profilesID?: string[];
  name: string;
  description: string;
  email: string;
  logoImage: string;
  websiteURL: string;
  jobPostsID?: string[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
