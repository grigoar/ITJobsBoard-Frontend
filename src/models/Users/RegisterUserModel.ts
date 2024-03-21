export interface RegisterUserModel {
  email: string;
  password: string;
  passwordConfirm: string;
  dateFormatLocale?: string;
  firstName?: string;
  lastName?: string;
}
