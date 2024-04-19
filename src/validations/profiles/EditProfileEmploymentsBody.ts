import * as yup from 'yup';

const EditMyProfileEmploymentValidationBody = yup.object().shape({
  employments: yup.array().of(
    yup.object({
      title: yup.string().required('Title is required'),
      company: yup.string().required('Company is required'),
      url: yup.string(),
      // startYear: yup.number().required(),
      // endYear: yup.number().required(),
      startYear: yup
        .string()
        .test('is-interval', 'Start Year min - 1950', (value: any) => {
          // check if the year is a number
          if (Number.isNaN(value)) {
            return false;
          }
          console.log('value', value);

          return parseInt(value, 10) >= 1950;
        })
        .required('Start Year is required'),
      endYear: yup
        .string()
        .test('is-interval', 'End Year max - 2024', (value: any) => {
          // check if the year is a number
          if (Number.isNaN(value)) {
            return false;
          }

          return parseInt(value, 10) >= 1950;
        })
        .required('End Year is required'),
      indexOrder: yup.number(),
    })
  ),
});

export default EditMyProfileEmploymentValidationBody;
