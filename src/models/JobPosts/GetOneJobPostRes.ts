import { JobPostEntity } from './JobPostEntity';

export type GetOneJobPostRes = {
  status: string;
  jobPost: JobPostEntity;
};
