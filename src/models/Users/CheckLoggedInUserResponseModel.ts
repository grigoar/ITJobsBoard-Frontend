import { UserEntity } from './UserEntity';

export interface CheckLoggedInUserResponseModel {
  status: string;
  user?: UserEntity;
}
