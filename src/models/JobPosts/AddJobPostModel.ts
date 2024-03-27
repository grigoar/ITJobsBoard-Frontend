import { AddCompanyModel } from '../Companies/AddCompanyModel';

type AddJobPostModel = {
  description: string;
  title: string;
  minSalary?: number;
  maxSalary?: number;
  location: string;
  isHighlighted?: boolean;
  enabledColor?: boolean;
  color?: string;
  isPremium?: boolean;
  companyID?: string;
  newCompany?: AddCompanyModel;
};

export default AddJobPostModel;
