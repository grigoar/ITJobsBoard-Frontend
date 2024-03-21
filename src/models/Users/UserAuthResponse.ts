import { UserEntity } from './UserEntity';

export interface UserAuthResponse {
  status: string;
  user: UserEntity;
  accessToken: string;
}
