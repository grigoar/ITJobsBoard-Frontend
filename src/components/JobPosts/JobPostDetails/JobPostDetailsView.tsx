'use client';

import TagLabel from '@/components/common/UI/TagLabel';
import useGetJobTagsByCategory from '@/hooks/jobPosts/useGetJobTagsByCategory';
import { JobPostOverviewEntity } from '@/models/JobPosts/JobPostOverviewEntity';
import React from 'react';
import Card from '@/components/common/Card/Card';
import Button from '@/components/common/Button/Button';
import { useAppSelector } from '@/store/hooks';
import TagLabelDetails from './TagLabelDetails';
import JobPostBenefits from './JobPostBenefits';

type Props = {
  jobPostData: JobPostOverviewEntity;
};

const JobPostDetailsView = ({ jobPostData }: Props) => {
  const { isUserLogged } = useAppSelector((state) => state.userData);
  const { tags } = useGetJobTagsByCategory(jobPostData.tags || []);

  const jobPostDomain = tags.companyDomainTags?.map((tag) => tag.labelName);
  const jobPostSize = tags.companySizeTags?.map((tag) => tag.labelName);
  const jobPostType = tags.companyTypeTags?.map((tag) => tag.labelName);
  const jobPostSeniority = tags.seniorityTags?.map((tag) => tag.labelName);
  const jobPostBenefits = tags.benefitsTags?.map((tag) => tag.labelName);

  if (!jobPostData) {
    return <div>Loading...</div>;
  }
  // TODO: Add chat gpt to format the description of the job post
  return (
    <div className="relative">
      {/* <div className="fixed right-24  top-14 z-50 mt-4 flex justify-end hover:brightness-110"> */}
      <div className="sticky right-0 top-3 z-50 mt-4 flex h-0 translate-y-full transform justify-end hover:brightness-110">
        <Button style={`btn !btn-full !mt-0 mr-2 h-fit`} link={`${isUserLogged ? '/add-job' : '/login?add-job=true'}`}>
          Apply
        </Button>
      </div>
      <section className="relative mx-4 my-4 flex w-full  max-w-[1000px] flex-col items-center   justify-between self-center  text-xl">
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
          <Card className="[&]:my-2 [&]:p-4">
            <p className="font-bold text-[var(--color-blue-light)]">Technologies:</p>
            <div className="flex flex-wrap gap-4">
              {tags.techTags?.map((tag) => <TagLabel key={tag.id} name={tag.labelName} />)}
            </div>
          </Card>

          <p className="whitespace-pre-wrap">{jobPostData?.description}</p>

          <JobPostBenefits benefits={jobPostBenefits} />
        </div>
      </section>
    </div>
  );
};

export default JobPostDetailsView;
