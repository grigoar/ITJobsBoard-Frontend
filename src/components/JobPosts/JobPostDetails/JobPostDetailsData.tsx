'use client';

import { useGetJobPostByIDQuery } from '@/api/jobPostsApi';
import React from 'react';
import JobPostDetailsView from './JobPostDetailsView';

type Props = {
  slug: string;
};

const JobPostDetailsData = ({ slug }: Props) => {
  const { data: jobPostData } = useGetJobPostByIDQuery(slug);
  // console.log(slug);

  console.log('jobPostData', jobPostData);

  if (!jobPostData) {
    return <div>Loading...</div>;
  }
  return <JobPostDetailsView jobPostData={jobPostData.item} />;
  // return (
  //   <section className=" mt-4 flex w-full max-w-[1000px]  flex-col items-center justify-between   self-center text-xl font-semibold">
  //     <div>
  //       <h1>{jobPostData?.item.title}</h1>
  //       <p className="whitespace-pre-wrap">{jobPostData?.item.description}</p>
  //     </div>
  //   </section>
  // );
};

export default JobPostDetailsData;
