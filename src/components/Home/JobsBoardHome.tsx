'use client';

import React from 'react';

import { useGetAllJobPostsQuery } from '@/api/jobPostsApi';
import JobPostsList from './JobPostsList';
// import Button from '../common/Button/Button';

const JobsBoardHome = () => {
  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();
  // const [getServerHealth, { data: serverHealth }] = useLazyGetServerHealthQuery();
  // const [testingServerFailure, { data: serverFailure }] = useLazyTestingServerFailureQuery();
  const { data: jobPostsData } = useGetAllJobPostsQuery(null);

  // const jobPostsCardsList = jobPostsData?.jobPosts?.map((jobPost) => (
  //   <JobPostCard key={jobPost.id} jobPost={jobPost} />
  // ));

  return (
    <section className=" flex w-full max-w-[800px] flex-col  items-center justify-between self-center pb-0  text-xl font-semibold">
      <div className="my-8 w-full">
        <JobPostsList jobPosts={jobPostsData?.items} />
      </div>
    </section>
  );
};

export default JobsBoardHome;
