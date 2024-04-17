import { AddTagModel } from '../Tags/AddTagModel';
import { EducationEntryModel } from './EducationEntryModel';
import { EmploymentEntryModel } from './EmploymentEntryModel';
import { SideProjectEntryModel } from './SideProjectEntryModel';

export type EditMyProfile = {
  firstName?: string;
  lastName?: string;
  location?: string;
  nationality?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  bio?: string;
  phoneNumber?: string;
  preferredMinHourRate?: number;
  employments?: EmploymentEntryModel[];
  educations?: EducationEntryModel[];
  sideProjects?: SideProjectEntryModel[];
  tags?: AddTagModel[];
};
