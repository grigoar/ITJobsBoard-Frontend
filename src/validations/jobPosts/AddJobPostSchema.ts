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
  // passwordConfirm: yup
  // .string()
  // .test('passwords-match', 'Passwords must match', function (value) {
  //   return this.parent.password === value;
  // })
  // .required(),
  companyID: yup.string().required(),
  // company: yup
  //   .object()
  //   .shape({
  //     name: yup.string().required(),
  //     description: yup.string().required(),
  //     email: yup.string().email().required(),
  //     logoImage: yup.string().required(),
  //     websiteURL: yup.string().required(),
  //   })
  //   .required(),
  location: yup.string().required(),
  // websiteURL: yup.string().required(),
  // isHighlighted: yup.boolean(),
  enabledColor: yup.boolean(),
  color: yup.string(),
  // isPremium: yup.boolean(),
});

export default AddJobPostSchema;
