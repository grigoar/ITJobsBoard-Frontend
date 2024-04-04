import { AddTagModel } from '@/models/JobPosts/AddJobPostModel';
import { TagListNameType } from '@/models/tags/TagList.type';
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
