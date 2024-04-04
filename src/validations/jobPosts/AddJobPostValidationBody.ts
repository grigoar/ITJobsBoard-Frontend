import * as yup from 'yup';

const AddJobPostValidationBody = yup.object().shape({
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

  companyID: yup.string(),
  newCompany: yup
    .object()
    .shape({
      name: yup.string().test('name', 'Company Name is required.', function (value) {
        const { companyID } = this.from?.[1] != null && this.from[1].value;
        if (companyID) {
          return true;
        }

        return !!value;
      }),
      description: yup.string().test('description', 'Company Description is required.', function (value) {
        const { companyID } = this.from?.[1] != null && this.from[1].value;
        if (companyID) {
          return true;
        }
        return !!value;
      }),
      email: yup
        .string()
        .email()
        .test('email', 'Company Email is required.', function (value) {
          const { companyID } = this.from?.[1] != null && this.from[1].value;
          if (companyID) {
            return true;
          }
          return !!value;
        }),
      logoImage: yup.string().test('logoImage', 'Company Logo is required.', function (value) {
        const { companyID } = this.from?.[1] != null && this.from[1].value;
        if (companyID) {
          return true;
        }
        return !!value;
      }),
      websiteURL: yup
        .string()
        .url()
        .test('websiteURL', 'Company Website is required.', function (value) {
          const { companyID } = this.from?.[1] != null && this.from[1].value;
          if (companyID) {
            return true;
          }
          return !!value;
        }),
    })
    .default(null),

  location: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
  enabledColor: yup.boolean(),
  color: yup.string(),
  techTags: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
      __isNew__: yup.boolean(),
    })
  ),
  seniorityTags: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
      __isNew__: yup.boolean(),
    })
  ),
  employmentTypeTags: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
      __isNew__: yup.boolean(),
    })
  ),
  companySizeTag: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
    __isNew__: yup.boolean(),
  }),
  companyTypeTag: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
    __isNew__: yup.boolean(),
  }),

  workLocationTag: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
    __isNew__: yup.boolean(),
  }),

  companyDomainTag: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
    __isNew__: yup.boolean(),
  }),
});
export default AddJobPostValidationBody;
