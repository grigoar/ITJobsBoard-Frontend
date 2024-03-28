import * as yup from 'yup';

const AddJobPostSchema = yup.object().shape({
  // profileID: yup.string().required(),
  description: yup.string().required('Description is required'),
  title: yup.string().required('Title is required'),
  minSalary: yup.number().transform((value) => (Number.isNaN(value) ? undefined : value)),
  maxSalary: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .test('maxSalary', 'Max salary must be greater than min salary', function (value?: number) {
      if (!value) return true;

      return parseFloat(this.parent.minSalary) <= value;
    }),

  // companyID: yup.string().required(),

  // TODO: Fix this validation by adding when() to check if newCompany is not empty
  // companyID: yup.string(),
  newCompany: yup.object().shape({
    name: yup.string().test('name', 'Company Name is required.', function (value) {
      const { companyID } = this.parent;
      if (companyID) {
        return true;
      }

      return !!value;
    }),
    description: yup.string().test('description', 'Company Description is required.', function (value) {
      const { companyID } = this.parent;
      if (companyID) {
        return true;
      }
      return !!value;
    }),
    email: yup
      .string()
      .email()
      .test('email', 'Company Email is required.', function (value) {
        const { companyID } = this.parent;
        if (companyID) {
          return true;
        }
        return !!value;
      }),
    logoImage: yup.string().test('logoImage', 'Company Logo is required.', function (value) {
      const { companyID } = this.parent;
      if (companyID) {
        return true;
      }
      return !!value;
    }),
    websiteURL: yup
      .string()
      .url()
      .test('websiteURL', 'Company Website is required.', function (value) {
        const { companyID } = this.parent;
        if (companyID) {
          return true;
        }
        return !!value;
      }),
  }),
  // newCompany: yup.object().shape({
  //   name: yup.string().required('Company Name is required.'),
  //   description: yup.string().required('Company Description is required.'),
  //   email: yup.string().email().required('Company Email is required.'),
  //   logoImage: yup.string().required('Company Logo is required.'),
  //   websiteURL: yup.string().url().required('Company Website is required.'),
  // }),
  // companyID: yup.string().test('companyID', 'Company is required.', function (value) {
  //   const { newCompany } = this.parent;
  //   if (newCompany) {
  //     if (
  //       newCompany.name &&
  //       newCompany.description &&
  //       newCompany.email &&
  //       newCompany.logoImage &&
  //       newCompany.websiteURL
  //     ) {
  //       return true;
  //     }
  //   }

  //   return !!value;
  // }),

  companyID: yup.string(),
  // companyID: yup.string().when('enabledColor', {
  //   is: true,
  //   then: (schema) => schema.required('Company is required.'),
  //   // otherwise: yup.string(),
  // }),
  // companyID: yup.string().when('newCompany', {
  //   is: (newCompany: any) =>
  //     !newCompany ||
  //     !newCompany.name ||
  //     !newCompany.description ||
  //     !newCompany.email ||
  //     !newCompany.logoImage ||
  //     !newCompany.websiteURL,

  //   then: yup.string().required('Company is required.'),
  //   otherwise: yup.string(),
  // }),

  location: yup.string().required('Location is required'),
  // websiteURL: yup.string().required(),
  // isHighlighted: yup.boolean(),
  enabledColor: yup.boolean(),
  color: yup.string(),
  // isPremium: yup.boolean(),
});

export default AddJobPostSchema;
