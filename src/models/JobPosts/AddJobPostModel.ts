// import { AddCompanyModel } from '../Companies/AddCompanyModel';

type AddJobPostModel = {
  description: string;
  title: string;
  salary?: number;
  location: string;
  isHighlighted?: boolean;
  color?: string;
  isPremium?: boolean;
  companyID: string;
  // company: AddCompanyModel;
};

export default AddJobPostModel;
