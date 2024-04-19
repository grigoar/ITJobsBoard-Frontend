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
      // startYear: yup.number().required(),
      // endYear: yup.number().required(),
      startYear: yup
        .string()
        .test('is-interval', 'Start Year min - 1950', (value: any) => {
          if (Number.isNaN(value)) {
            return false;
          }
          return parseInt(value, 10) >= 1950;
        })
        .required(),
      endYear: yup
        .string()
        .test('is-interval', 'End Year max - 2024', (value: any) => {
          // check if the year is a number
          if (Number.isNaN(value)) {
            return false;
          }

          return parseInt(value, 10) >= 1950;
        })
        .required(),
      indexOrder: yup.number(),
    })
  ),

  educations: yup.array().of(
    yup.object({
      title: yup.string().required(),
      institution: yup.string().required(),
      url: yup.string(),
      startYear: yup.string().test('is-interval', 'Start Year min - 1950', (value: any) => {
        return parseInt(value, 10) >= 1950;
      }),
      endYear: yup.string().test('is-interval', 'End Year max - 2024', (value: any) => {
        return parseInt(value, 10) >= 1950;
      }),
      indexOrder: yup.number(),
    })
  ),

  sideProjects: yup.array().of(
    yup.object({
      title: yup.string().required(),
      description: yup.string().required(),
      url: yup.string(),
      // startYear: yup.number(),
      startYear: yup.string().test('is-interval', 'Start Year min - 1950', (value: any) => {
        return parseInt(value, 10) >= 1950;
      }),
      endYear: yup.string().test('is-interval', 'End Year max - 2024', (value: any) => {
        return parseInt(value, 10) >= 1950;
      }),
      // startYear: yup.lazy(
      //   (value) => (value === '' ? yup.string() : yup.number())
      //   // if (value) {
      //   //   return yup.number();
      //   // }
      //   // return yup.number();
      // ),
      // endYear: yup.number(),
      indexOrder: yup.number(),
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
  yearsOfExperienceTag: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),

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
