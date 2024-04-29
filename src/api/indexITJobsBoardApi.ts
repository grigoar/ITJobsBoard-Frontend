import constants from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const itJobsBoardApi = createApi({
  reducerPath: 'itJobsBoardApi',
  // global configuration for the api
  refetchOnMountOrArgChange: 30,
  baseQuery: fetchBaseQuery({
    // * this can be used without using proxy
    // baseUrl: `${process.env.NEXT__PUBLIC_SERVER_API_URL}/`,
    // * this needs to be set with http so the proxy can work
    baseUrl: `${process.env.NEXT_PUBLIC_SITE_DOMAIN_URL}/api`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'same-origin',
  }),
  tagTypes: [
    constants.USER_PROFILE_TAG,
    constants.COMPANIES_TAG,
    constants.JOB_POSTS_TAG,
    constants.TAGS_TAG,
    constants.USER_SETTING_TAG,
  ],
  endpoints: () => ({}),
});

export default itJobsBoardApi;
