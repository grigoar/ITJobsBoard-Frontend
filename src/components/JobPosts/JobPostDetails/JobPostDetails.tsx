'use client';

import { useGetJobPostByIDQuery } from '@/api/jobPostsApi';
import React from 'react';

type Props = {
  slug: string;
};

const JobPostDetails = ({ slug }: Props) => {
  const { data: jobPostData } = useGetJobPostByIDQuery(slug);
  // console.log(slug);

  console.log('jobPostData', jobPostData);

  if (!jobPostData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <h1>{jobPostData?.item.title}</h1>
        <p>{jobPostData?.item.description}</p>
      </div>
    </div>
  );
};

export default JobPostDetails;
