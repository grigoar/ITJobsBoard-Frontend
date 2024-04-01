import { JobPostEntity } from './JobPostEntity';

export type GetJobPostsRes = {
  status: string;
  nrJobPosts: number;
  // ! TODO: Might need to remove the profile ID from the response
  jobPosts: JobPostEntity[];
};
