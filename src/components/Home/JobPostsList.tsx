import React from 'react';
import { JobPostOverviewEntity } from '@/models/JobPosts/JobPostOverviewEntity';
import JobPostCard from './JobPostCard';

interface Props {
  // children: React.ReactNode;
  className?: string;
  // maxWidth?: number;
  jobPosts?: JobPostOverviewEntity[];
}

const JobPostsList = ({ jobPosts }: Props) => {
  if (!jobPosts) {
    // ! TODO: This needs a little more work
    return <div className="text-center">No job posts found at this moment!</div>;
  }

  return (
    <ul className="w-full">
      {jobPosts.map((jobPost) => (
        <JobPostCard key={jobPost.slug} jobPost={jobPost} />
      ))}
    </ul>
  );
};

export default JobPostsList;
