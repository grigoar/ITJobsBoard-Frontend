import { AddCompanyModel } from '@/models/Companies/AddCompanyModel';

export type TagsValidationType = {
  label?: string;
  value?: string;
  __isNew__?: boolean;
  type?: string;
};

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
  color?: string;
  isPremium?: boolean;
  companyID?: string;
  newCompany?: Partial<AddCompanyModel> | null;
  techTags?: TagsValidationType[];
  seniorityTags?: TagsValidationType[];
  employmentTypeTags?: TagsValidationType[];
  companySizeTag?: TagsValidationType;
  companyTypeTag?: TagsValidationType;
  workLocationTag?: TagsValidationType;
  companyDomainTag?: TagsValidationType;
};

export default AddJobPostValidationModel;
