import { TagListNameType } from './TagList.type';

export type TagEntity = {
  id: string;
  name: string;
  type: TagListNameType;
  isCustom: boolean;
  labelName: string;
  // profiles?: ProfileEntity[];
  // jobPosts?: JobPostEntity[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
