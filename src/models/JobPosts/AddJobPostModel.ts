import { AddCompanyModel } from '../Companies/AddCompanyModel';

type AddTagModel = {
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
  enabledColor?: boolean;
  color?: string;
  isPremium?: boolean;
  companyID?: string;
  newCompany?: Partial<AddCompanyModel> | null;
  newTags?: AddTagModel[];
  customTags?: string[];
};

export default AddJobPostModel;
