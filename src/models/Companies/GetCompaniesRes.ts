import { CompanyEntity } from './CompanyEntity';

export type GetCompaniesRes = {
  status: string;
  nrCompanies: number;
  companies: CompanyEntity[];
};
