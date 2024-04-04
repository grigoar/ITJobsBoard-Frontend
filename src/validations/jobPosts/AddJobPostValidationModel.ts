import { AddCompanyModel } from '@/models/Companies/AddCompanyModel';

type AddJobPostValidationModel = {
  description: string;
  title: string;
  minSalary?: number;
  maxSalary?: number;
  location?: {
    label?: string;
    value?: string;
  };
  isHighlighted?: boolean;
  enabledColor?: boolean;
  color?: string;
  isPremium?: boolean;
  companyID?: string;
  newCompany?: Partial<AddCompanyModel> | null;
  newTags?: {
    label?: string;
    value?: string;
    __isNew__?: boolean;
    type?: string;
  }[];
};

export default AddJobPostValidationModel;
