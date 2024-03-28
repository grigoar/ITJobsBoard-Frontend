import constants from '@/utils/constants';
import { GetCompaniesRes } from '@/models/Companies/GetCompaniesRes';
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
    getAllProfileCompanies: builder.query<GetCompaniesRes, string>({
      query: (userID: string) => {
        return {
          url: `profiles/${userID}/companies`,
        };
      },
      keepUnusedDataFor: 10,
      providesTags: [constants.COMPANIES_TAG, constants.JOB_POSTS_TAG],
    }),
  }),
});

export const { useGetAllProfileCompaniesQuery } = companiesApi;
