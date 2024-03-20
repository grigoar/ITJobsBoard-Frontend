export interface UserEntity {
  id: string;
  profileImage: string;
  countryCode: string;
  email: string;
  username: string;
  emailValidated: boolean;
  emailConfirmationExpires?: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
  practicePowerUser?: boolean;
}

export const typeGuardUserEntity = (object: any): object is UserEntity => {
  if (!object) return false;
  return (object as UserEntity).id !== undefined;
};

export const loggedInUserInitialStateEmpty = {
  id: '',
  profileImage: '',
  countryCode: '',
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  roles: [],
  emailValidated: false,
  practicePowerUser: false,
};
