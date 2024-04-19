import { TagListNameType } from '@/models/Tags/TagList.type';

export type TagsValidationType = {
  label?: string;
  value?: string;
  __isNew__?: boolean;
  type?: TagListNameType;
};
