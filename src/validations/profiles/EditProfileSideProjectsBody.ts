import * as yup from 'yup';

// title: string;
// description: string;
// url?: string;
// startYear?: string;
// endYear?: string;
// indexOrder?: number;

const EditMyProfileSideProjectsValidationBody = yup.object().shape({
  sideProjects: yup.array().of(
    yup.object({
      title: yup.string().required('Title is required'),
      description: yup.string().required('Description is required'),
      url: yup.string(),
      startYear: yup.string().test('is-interval', 'Start Year min - 1950', (value: any) => {
        // check if the year is a number
        if (Number.isNaN(value)) {
          return false;
        }
        console.log('value', value);

        return parseInt(value, 10) >= 1950;
      }),

      endYear: yup.string().test('is-interval', 'End Year max - 2024', (value: any) => {
        // check if the year is a number
        if (Number.isNaN(value)) {
          return false;
        }

        return parseInt(value, 10) >= 1950;
      }),

      indexOrder: yup.number(),
    })
  ),
});

export default EditMyProfileSideProjectsValidationBody;
