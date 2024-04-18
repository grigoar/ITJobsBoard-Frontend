import { EducationEntryModel } from '../Profiles/EducationEntryModel';
import { EmploymentEntryModel } from '../Profiles/EmploymentEntryModel';
import { SideProjectEntryModel } from '../Profiles/SideProjectEntryModel';
import { TagEntity } from '../Tags/TagEntity';

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
};
