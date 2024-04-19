import { TagListNameType } from './TagList.type';

export type AddTagModel = {
  id?: string;
  name?: string;
  isCustom?: boolean;
  type?: TagListNameType;
};
