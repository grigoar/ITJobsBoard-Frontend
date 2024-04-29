import { ApiGetAllGenericResponse } from '@/models/Common/ApiGetAllGenericResponse';
import { CompanyEntity } from '@/models/Companies/CompanyEntity';
import constants from '@/utils/constants';
import itJobsBoardApi from './indexITJobsBoardApi';

const companiesApi = itJobsBoardApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
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
