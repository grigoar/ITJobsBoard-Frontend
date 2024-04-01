'use client';

import { useGetJobPostByIDQuery } from '@/api/jobPostsApi';
import React from 'react';

type Props = {
  slug: string;
};

const JobPostDetails = ({ slug }: Props) => {
  const { data: jobPostData } = useGetJobPostByIDQuery(slug);
  // console.log(slug);

  return (
    <div>
      Job Post Details Page
      {jobPostData ? (
        <div>
          <h1>{jobPostData?.jobPost.title}</h1>
          <p>{jobPostData?.jobPost.description}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default JobPostDetails;
