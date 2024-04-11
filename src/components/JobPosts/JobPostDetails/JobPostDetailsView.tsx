'use client';

import TagLabel from '@/components/common/UI/TagLabel';
import useGetJobTagsByCategory from '@/hooks/jobPosts/useGetJobTagsByCategory';
import { JobPostOverviewEntity } from '@/models/JobPosts/JobPostOverviewEntity';
import React from 'react';
import TagLabelDetails from './TagLabelDetails';

type Props = {
  jobPostData: JobPostOverviewEntity;
};

const JobPostDetailsView = ({ jobPostData }: Props) => {
  const { tags } = useGetJobTagsByCategory(jobPostData.tags || []);

  const jobPostDomain = tags.companyDomainTags?.map((tag) => tag.labelName);
  const jobPostSize = tags.companySizeTags?.map((tag) => tag.labelName);
  const jobPostType = tags.companyTypeTags?.map((tag) => tag.labelName);
  const jobPostSeniority = tags.seniorityTags?.map((tag) => tag.labelName);

  if (!jobPostData) {
    return <div>Loading...</div>;
  }
  return (
    <section className=" mt-4 flex w-full max-w-[1000px]  flex-col items-center justify-between   self-center text-xl ">
      <div>
        <h1 className="mb-4">{jobPostData?.title}</h1>

        <div className="flex flex-wrap justify-between gap-4">
          {jobPostData.maxSalary && jobPostData.minSalary && (
            <TagLabelDetails name={'Salary'} values={[`$${jobPostData.minSalary} - ${jobPostData.maxSalary}`]} />
          )}
          {jobPostDomain.length > 0 && <TagLabelDetails name={'Domain'} values={jobPostDomain} />}
          {jobPostSize.length > 0 && <TagLabelDetails name={'Size'} values={jobPostSize} />}
          {jobPostType.length > 0 && <TagLabelDetails name={'Type'} values={jobPostType} />}
          {jobPostSeniority.length > 0 && <TagLabelDetails name={'Seniority'} values={jobPostSeniority} />}
        </div>
        <p className="font-bold">Technologies:</p>
        <div className="flex flex-wrap gap-4">
          {tags.techTags?.map((tag) => <TagLabel key={tag.id} name={tag.labelName} />)}
        </div>
        <p className="whitespace-pre-wrap">{jobPostData?.description}</p>
      </div>
    </section>
  );
};

export default JobPostDetailsView;
