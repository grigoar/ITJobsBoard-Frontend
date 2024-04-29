import { ApiGetAllGenericResponse } from '@/models/Common/ApiGetAllGenericResponse';
import { TagEntity } from '@/models/Tags/TagEntity';
import constants from '@/utils/constants';
import itJobsBoardApi from './indexITJobsBoardApi';

const tagsApi = itJobsBoardApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllTags: builder.query<ApiGetAllGenericResponse<TagEntity>, null>({
      query: () => {
        return {
          url: `tags`,
        };
      },
      keepUnusedDataFor: 10,
      providesTags: [constants.TAGS_TAG, constants.JOB_POSTS_TAG],
    }),
  }),
});

export const { useGetAllTagsQuery } = tagsApi;
