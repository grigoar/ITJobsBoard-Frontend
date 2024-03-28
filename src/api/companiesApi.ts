import constants from '@/utils/constants';
import itJobsBoardApi from './indexITJobsBoardApi';

const companiesApi = itJobsBoardApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // addNewJobPost: builder.mutation<ApiGenericResponse, AddJobPostModel>({
    //   query: (newJobPost: AddJobPostModel) => ({
    //     url: '/job-posts',
    //     method: 'POST',
    //     body: newJobPost,
    //   }),
    //   invalidatesTags: [constants.JOB_POSTS_TAG],
    // }),
    getAllCompanies: builder.query<string, null>({
      query: () => {
        return {
          url: `companies`,
        };
      },
      keepUnusedDataFor: 10,
      providesTags: [constants.COMPANIES_TAG, constants.JOB_POSTS_TAG],
    }),
  }),
});

export const { useGetAllCompaniesQuery } = companiesApi;
