import * as yup from 'yup';

const EditMyProfileValidationBody = yup.object({
  firstName: yup.string(),
  lastName: yup.string(),
  location: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
  nationality: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
  website: yup
    .string()
    .url()
    .transform((currentValue) => {
      const doesNotStartWithHttp =
        currentValue && !(currentValue.startsWith('http://') || currentValue.startsWith('https://'));

      if (doesNotStartWithHttp) {
        return `https://${currentValue}`;
      }
      return currentValue;
    }),
  linkedin: yup
    .string()
    .url()
    .transform((currentValue) => {
      const doesNotStartWithHttp =
        currentValue && !(currentValue.startsWith('http://') || currentValue.startsWith('https://'));

      if (doesNotStartWithHttp) {
        return `https://${currentValue}`;
      }
      return currentValue;
    }),
  github: yup
    .string()
    .url()
    .transform((currentValue) => {
      const doesNotStartWithHttp =
        currentValue && !(currentValue.startsWith('http://') || currentValue.startsWith('https://'));

      if (doesNotStartWithHttp) {
        return `https://${currentValue}`;
      }
      return currentValue;
    }),
  twitter: yup
    .string()
    .url()
    .transform((currentValue) => {
      const doesNotStartWithHttp =
        currentValue && !(currentValue.startsWith('http://') || currentValue.startsWith('https://'));

      if (doesNotStartWithHttp) {
        return `https://${currentValue}`;
      }
      return currentValue;
    }),
  bio: yup.string(),
  phoneNumber: yup.string(),
  // languages: yup.array().of(yup.string().required()),
  preferredMinHourRate: yup.number(),
  employments: yup.array().of(
    yup.object({
      title: yup.string().required(),
      company: yup.string().required(),
      url: yup.string(),
      startYear: yup.number().required(),
      endYear: yup.number().required(),
    })
  ),

  educations: yup.array().of(
    yup.object({
      title: yup.string().required(),
      institution: yup.string().required(),
      url: yup.string(),
      startYear: yup.number(),
      endYear: yup.number(),
    })
  ),

  sideProjects: yup.array().of(
    yup.object({
      title: yup.string().required(),
      description: yup.string().required(),
      url: yup.string(),
      startYear: yup.number(),
      endYear: yup.number(),
    })
  ),
  techTags: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
      __isNew__: yup.boolean(),
    })
  ),
  languagesTags: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
      __isNew__: yup.boolean(),
    })
  ),
  yearsOfExperienceTags: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
      __isNew__: yup.boolean(),
    })
  ),

  jobRolesTags: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
      __isNew__: yup.boolean(),
    })
  ),
  desiredRoleTag: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
});

export default EditMyProfileValidationBody;
