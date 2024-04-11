import { getJobPostTagsByType } from '@/lib/jobPosts/jobPostsHelpers';
import { TagEntity } from '@/models/tags/TagEntity';
import { useEffect, useState } from 'react';

const useGetJobTagsByCategory = (allTags: TagEntity[]) => {
  const [tags, setTags] = useState<{
    techTags: TagEntity[];
    seniorityTags: TagEntity[];
    employmentTypeTags: TagEntity[];
    companySizeTags: TagEntity[];
    companyTypeTags: TagEntity[];
    workLocationTags: TagEntity[];
    companyDomainTags: TagEntity[];
    benefitsTags: TagEntity[];
  }>({
    techTags: [],
    seniorityTags: [],
    employmentTypeTags: [],
    companySizeTags: [],
    companyTypeTags: [],
    workLocationTags: [],
    companyDomainTags: [],
    benefitsTags: [],
  });

  useEffect(() => {
    const {
      techTagsOnly,
      seniorityTagsOnly,
      employmentTypeTagsOnly,
      companySizeTagsOnly,
      companyTypeTagsOnly,
      workLocationTagsOnly,
      companyDomainTagsOnly,
      benefitsTagsOnly,
    } = getJobPostTagsByType(allTags || []);
    setTags({
      techTags: techTagsOnly,
      seniorityTags: seniorityTagsOnly,
      employmentTypeTags: employmentTypeTagsOnly,
      companySizeTags: companySizeTagsOnly,
      companyTypeTags: companyTypeTagsOnly,
      workLocationTags: workLocationTagsOnly,
      companyDomainTags: companyDomainTagsOnly,
      benefitsTags: benefitsTagsOnly,
    });
  }, [allTags, setTags]);

  return { tags };
};

export default useGetJobTagsByCategory;
