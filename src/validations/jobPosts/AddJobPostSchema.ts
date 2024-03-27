import * as yup from 'yup';

const AddJobPostSchema = yup.object().shape({
  // profileID: yup.string().required(),
  description: yup.string().required('Description is required.'),
  title: yup.string().required(),
  salary: yup.number(),
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
  color: yup.string(),
  // isPremium: yup.boolean(),
});

export default AddJobPostSchema;
