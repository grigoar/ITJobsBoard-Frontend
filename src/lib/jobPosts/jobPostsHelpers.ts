import { AddTagModel } from '@/models/JobPosts/AddJobPostModel';
import { TagEntity } from '@/models/tags/TagEntity';
import { TagListName, TagListNameType } from '@/models/tags/TagList.type';
import { TagsValidationType } from '@/validations/jobPosts/AddJobPostValidationModel';

export const createJobPostBackendTags = (
  tagType: TagListNameType,
  dataFormTags: TagsValidationType[] = []
): AddTagModel[] => {
  const jobTechTags =
    dataFormTags?.map((tag) => {
      return {
        id: tag.value,
        name: tag.label,
        isCustom: tag.__isNew__,
        type: tagType,
      };
    }) || [];
  return jobTechTags;
};

export const getJobPostTagsByType = (allTagsRes: TagEntity[]) => {
  const techTagsOnly = allTagsRes?.filter((tag: TagEntity) => tag.type === TagListName.TECH_SKILL) || [];
  const seniorityTagsOnly = allTagsRes.filter((tag: TagEntity) => tag.type === TagListName.EXPERIENCE_LEVEL) || [];
  const employmentTypeTagsOnly = allTagsRes.filter((tag: TagEntity) => tag.type === TagListName.EMPLOYMENT_TYPE) || [];
  const companySizeTagsOnly = allTagsRes?.filter((tag: TagEntity) => tag.type === TagListName.COMPANY_SIZE) || [];
  const companyTypeTagsOnly = allTagsRes.filter((tag: TagEntity) => tag.type === TagListName.COMPANY_TYPE) || [];
  const workLocationTagsOnly = allTagsRes.filter((tag: TagEntity) => tag.type === TagListName.WORK_PLACE) || [];
  const companyDomainTagsOnly = allTagsRes.filter((tag: TagEntity) => tag.type === TagListName.DOMAIN) || [];
  const benefitsTagsOnly = allTagsRes.filter((tag: TagEntity) => tag.type === TagListName.BENEFITS) || [];

  return {
    techTagsOnly,
    seniorityTagsOnly,
    employmentTypeTagsOnly,
    companySizeTagsOnly,
    companyTypeTagsOnly,
    workLocationTagsOnly,
    companyDomainTagsOnly,
    benefitsTagsOnly,
  };
};
