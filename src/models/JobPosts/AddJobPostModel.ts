import { AddCompanyModel } from '../Companies/AddCompanyModel';
import { AddTagModel } from '../Tagssss/AddTagModel';

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
