import { CompanyEntity } from '../Companies/CompanyEntity';
import { EducationEntryModel } from '../Profiles/EducationEntryModel';
import { EmploymentEntryModel } from '../Profiles/EmploymentEntryModel';
import { SideProjectEntryModel } from '../Profiles/SideProjectEntryModel';
import { TagEntity } from '../Tags/TagEntity';
import { TagListName } from '../Tags/TagList.type';

export interface UserEntity {
  id: string;
  // userIDs: string[];
  email: string;
  emailValidated: boolean;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  country?: string;
  location?: string;
  nationality?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  bio?: string;
  phoneNumber?: string;
  CV?: string;
  languages?: string[];
  preferredMinHourRate?: number;
  employments?: EmploymentEntryModel[];
  educations?: EducationEntryModel[];
  sideProjects?: SideProjectEntryModel[];
  tags?: TagEntity[];
  companies?: CompanyEntity[];
  // ! TODO: Check if this is correct. The companies should have jobPosts, but maybe the user should have also have them
  jobPosts?: any[];
  desiredRole?: TagEntity;

  roles: string[];
  // companies?: ICompany[];
  // created_at: Date;
  // updated_at: Date;
}

export const typeGuardUserEntity = (object: any): object is UserEntity => {
  if (!object) return false;
  return (object as UserEntity).id !== undefined;
};

export const loggedInUserInitialStateEmpty = {
  id: '',
  email: '',
  emailValidated: false,
  firstName: '',
  lastName: '',
  profileImage: '',
  country: '',
  location: '',
  nationality: '',
  website: '',
  linkedin: '',
  github: '',
  twitter: '',
  bio: '',
  phoneNumber: '',
  CV: '',
  languages: [],
  preferredMinHourRate: 0,
  employments: [],
  educations: [],
  sideProjects: [],
  tags: [],
  roles: [],
  companies: [],
  jobPosts: [],
  desiredRole: {
    id: '',
    name: '',
    type: TagListName.TECH_SKILL,
    isCustom: false,
    labelName: '',
  },
};
