import AddJobPostModel from '@/models/JobPosts/AddJobPostModel';
import { ApiGenericResponse } from '@/models/Common/ApiGenericResponse';
import constants from '@/utils/constants';
import { GetJobPostsRes } from '@/models/JobPosts/GetJobPostsRes';
import { GetOneJobPostRes } from '@/models/JobPosts/GetOneJobPostRes';
import itJobsBoardApi from './indexITJobsBoardApi';

const jobPostsApi = itJobsBoardApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addNewJobPost: builder.mutation<ApiGenericResponse, AddJobPostModel>({
      query: (newJobPost: AddJobPostModel) => ({
        url: '/job-posts',
        method: 'POST',
        body: newJobPost,
      }),
      invalidatesTags: [constants.JOB_POSTS_TAG],
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
    getJobPostByID: builder.query<GetOneJobPostRes, string>({
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

export const { useAddNewJobPostMutation, useGetAllJobPostsQuery, useGetJobPostByIDQuery } = jobPostsApi;
