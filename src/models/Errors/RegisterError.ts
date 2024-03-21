export interface AuthErrorModel {
  data: {
    status: string;
    message: string;
    stack?: string;
    err?: {};
  };
  status: string;
}
