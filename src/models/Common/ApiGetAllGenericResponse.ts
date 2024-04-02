export type ApiGetAllGenericResponse<T = undefined> = {
  status: string;
  nrItems: number;
  items: T[];
};
