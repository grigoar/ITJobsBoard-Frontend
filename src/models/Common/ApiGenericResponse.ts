export type ApiGenericResponse<T = undefined> = {
  data?: T;
  message: string;
  success: boolean;
};
