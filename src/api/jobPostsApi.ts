import AddJobPostModel from '@/models/JobPosts/AddJobPostModel';
import { ApiGenericResponse } from '@/models/Common/ApiGenericResponse';
import constants from '@/utils/constants';
import { GetOneJobPostRes } from '@/models/JobPosts/GetOneJobPostRes';
import { ApiGetAllGenericResponse } from '@/models/Common/ApiGetAllGenericResponse';
import { JobPostEntity } from '@/models/JobPosts/JobPostEntity';
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
      invalidatesTags: [constants.JOB_POSTS_TAG, constants.COMPANIES_TAG, constants.TAGS_TAG],
    }),
    getAllJobPosts: builder.query<ApiGetAllGenericResponse<JobPostEntity>, null>({
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
