import { getJobPostTagsByType } from '@/lib/jobPosts/jobPostsHelpers';
import { TagEntity } from '@/models/Tags/TagEntity';

export const getJobTagsByCategory = (allTags: TagEntity[]) => {
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
    jobRolesTagsOnly,
    yearsOfExperienceTagsOnly,
  } = getJobPostTagsByType(allTags || []);

  const tags = {
    techTags: techTagsOnly,
    seniorityTags: seniorityTagsOnly,
    employmentTypeTags: employmentTypeTagsOnly,
    companySizeTags: companySizeTagsOnly,
    companyTypeTags: companyTypeTagsOnly,
    workLocationTags: workLocationTagsOnly,
    companyDomainTags: companyDomainTagsOnly,
    benefitsTags: benefitsTagsOnly,
    languagesTags: languagesTagsOnly,
    jobRolesTags: jobRolesTagsOnly,
    yearsOfExperienceTags: yearsOfExperienceTagsOnly,
  };
  return {
    tags,
  };
};
