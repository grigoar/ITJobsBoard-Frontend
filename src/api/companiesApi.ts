import constants from '@/utils/constants';
import { ApiGetAllGenericResponse } from '@/models/Common/ApiGetAllGenericResponse';
import { CompanyEntity } from '@/models/Companies/CompanyEntity';
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
    getAllCompanies: builder.query<ApiGetAllGenericResponse<CompanyEntity>, null>({
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
