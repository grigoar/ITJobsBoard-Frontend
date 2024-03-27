import AddJobPostModel from '@/models/JobPosts/AddJobPostModel';
import { ApiGenericResponse } from '@/models/Common/ApiGenericResponse';
import constants from '@/utils/constants';
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
  }),
});

export const { useAddNewJobPostMutation } = jobPostsApi;
