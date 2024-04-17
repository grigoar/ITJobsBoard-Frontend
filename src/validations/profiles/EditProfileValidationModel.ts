import { EducationEntryModel } from '@/models/Profiles/EducationEntryModel';
import { EmploymentEntryModel } from '@/models/Profiles/EmploymentEntryModel';
import { SideProjectEntryModel } from '@/models/Profiles/SideProjectEntryModel';
import { TagsValidationType } from '../utils/TagValidationType';

export type EditMyProfileValidationModel = {
  firstName?: string;
  lastName?: string;
  location?: {
    label?: string;
    value?: string;
  };
  nationality?: {
    label?: string;
    value?: string;
  };
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  bio?: string;
  phoneNumber?: string;
  // languages?: string[];
  preferredMinHourRate?: number;
  employments?: EmploymentEntryModel[];
  educations?: EducationEntryModel[];
  sideProjects?: SideProjectEntryModel[];
  techTags?: TagsValidationType[];
  languagesTags?: TagsValidationType[];
};
