import { JobPostEntity } from '@/models/JobPosts/JobPostEntity';
import React from 'react';
import JobPostCard from './JobPostCard';

interface Props {
  // children: React.ReactNode;
  className?: string;
  // maxWidth?: number;
  jobPosts?: JobPostEntity[];
}

const JobPostsList = ({ jobPosts }: Props) => {
  if (!jobPosts) {
    // ! TODO: This needs a little more work
    return <div>No job posts found</div>;
  }

  return (
    <ul>
      {jobPosts.map((jobPost) => (
        <JobPostCard key={jobPost.id} jobPost={jobPost} />
      ))}
    </ul>
  );
};

export default JobPostsList;