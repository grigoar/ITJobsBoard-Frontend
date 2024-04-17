import { AddCompanyModel } from '../Companies/AddCompanyModel';

export type AddTagModel = {
  id?: string;
  name?: string;
  isCustom?: boolean;
  type?: string;
};

type AddJobPostModel = {
  description: string;
  title: string;
  minSalary?: number;
  maxSalary?: number;
  location: string;
  isHighlighted?: boolean;
  color?: string;
  isPremium?: boolean;
  companyID?: string;
  newCompany?: Partial<AddCompanyModel> | null;
  tags?: AddTagModel[];
};

export default AddJobPostModel;
