import { getJobPostTagsByType } from '@/lib/jobPosts/jobPostsHelpers';
import { TagEntity } from '@/models/Tagssss/TagEntity';
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
    languagesTags: TagEntity[];
  }>({
    techTags: [],
    seniorityTags: [],
    employmentTypeTags: [],
    companySizeTags: [],
    companyTypeTags: [],
    workLocationTags: [],
    companyDomainTags: [],
    benefitsTags: [],
    languagesTags: [],
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
      languagesTagsOnly,
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
      languagesTags: languagesTagsOnly,
    });
  }, [allTags, setTags]);

  return { tags };
};

export default useGetJobTagsByCategory;
