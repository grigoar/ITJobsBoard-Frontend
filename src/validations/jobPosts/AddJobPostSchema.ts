import * as yup from 'yup';

const AddJobPostSchema = yup.object().shape({
  // profileID: yup.string().required(),
  description: yup.string().required('Description is required.'),
  title: yup.string().required(),
  minSalary: yup.number(),
  maxSalary: yup.number().test('maxSalary', 'Max salary must be greater than min salary', function (value) {
    if (!value) return true;

    return this.parent.minSalary <= value;
  }),
  // companyID: yup.string().required(),

  // TODO: Fix this validation by adding when() to check if newCompany is not empty
  companyID: yup.string(),
  newCompany: yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    email: yup.string().email().required(),
    logoImage: yup.string().required(),
    websiteURL: yup.string().url().required(),
  }),
  // companyID: yup.string().when('newCompany', {
  //   is: (newCompany: Record<string, unknown>) => Object.keys(newCompany).length !== 5,
  //   then: yup.string().required('Company is required.'),
  //   otherwise: yup.string(),
  // }),

  location: yup.string().required(),
  // websiteURL: yup.string().required(),
  // isHighlighted: yup.boolean(),
  enabledColor: yup.boolean(),
  color: yup.string(),
  // isPremium: yup.boolean(),
});

export default AddJobPostSchema;
