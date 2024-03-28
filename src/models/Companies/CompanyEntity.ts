export type CompanyEntity = {
  id: string;
  // profiles: UserEntity[];
  profilesID?: string[];
  name: string;
  description: string;
  email: string;
  logoImage: string;
  websiteURL: string;
  // jobPosts: JobPostEntity[];
  jobPostsID?: string[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
