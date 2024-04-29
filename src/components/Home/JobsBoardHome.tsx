'use client';

import { useGetAllJobPostsQuery } from '@/api/jobPostsApi';
import JobPostsList from './JobPostsList';

const JobsBoardHome = () => {
  const { data: jobPostsData } = useGetAllJobPostsQuery(null);

  return (
    <section className=" flex w-full max-w-[800px] flex-col  items-center justify-between self-center pb-0  text-xl font-semibold">
      <div className="my-8 w-full">
        <JobPostsList jobPosts={jobPostsData?.items} />
      </div>
    </section>
  );
};

export default JobsBoardHome;
