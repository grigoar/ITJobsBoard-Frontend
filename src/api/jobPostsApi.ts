import { ApiGenericResponse } from '@/models/Common/ApiGenericResponse';
import { ApiGetOneGenericResponse } from '@/models/Common/ApiGetOneGenericResponse';
import { GetJobPostsRes } from '@/models/JobPosts/GetJobPostsRes';
import { JobPostOverviewEntity } from '@/models/JobPosts/JobPostOverviewEntity';
import constants from '@/utils/constants';
import itJobsBoardApi from './indexITJobsBoardApi';

const jobPostsApi = itJobsBoardApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addNewJobPost: builder.mutation<ApiGenericResponse, FormData>({
      query: (newJobPost: FormData) => ({
        url: '/job-posts',
        method: 'POST',
        body: newJobPost,
        formData: true,
      }),
      invalidatesTags: [constants.JOB_POSTS_TAG, constants.COMPANIES_TAG, constants.TAGS_TAG],
    }),

    getAllJobPosts: builder.query<GetJobPostsRes, null>({
      query: () => {
        return {
          url: `job-posts`,
        };
      },
      keepUnusedDataFor: 10,
      providesTags: [constants.COMPANIES_TAG, constants.JOB_POSTS_TAG],
    }),
    getJobPostBySlug: builder.query<ApiGetOneGenericResponse<JobPostOverviewEntity>, string>({
      query: (jobPostId: string) => {
        return {
          url: `job-posts/${jobPostId}`,
        };
      },
      keepUnusedDataFor: 10,
      providesTags: [constants.COMPANIES_TAG, constants.JOB_POSTS_TAG],
    }),
  }),
});

export const { useAddNewJobPostMutation, useGetAllJobPostsQuery, useGetJobPostBySlugQuery } = jobPostsApi;
