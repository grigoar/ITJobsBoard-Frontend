'use client';

import { useGetJobPostBySlugQuery } from '@/api/jobPostsApi';
import JobPostDetailsView from './JobPostDetailsView';

type Props = {
  slug: string;
};

const JobPostDetailsData = ({ slug }: Props) => {
  const { data: jobPostData } = useGetJobPostBySlugQuery(slug);

  if (!jobPostData) {
    return <div>Loading...</div>;
  }
  return <JobPostDetailsView jobPostData={jobPostData.item} />;
};

export default JobPostDetailsData;
