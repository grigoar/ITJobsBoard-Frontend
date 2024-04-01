import constants from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const itJobsBoardApi = createApi({
  reducerPath: 'itJobsBoardApi',
  // global configuration for the api
  refetchOnMountOrArgChange: 30,
  // baseQuery: dynamicBaseQuery,
  baseQuery: fetchBaseQuery({
    // * this can be used without using proxy
    // baseUrl: `${process.env.NEXT__PUBLIC_SERVER_API_URL}/`,
    // * this needs to be set with http so the proxy can work
    baseUrl: `${process.env.NEXT_PUBLIC_SITE_DOMAIN_URL}/api`,
    // baseUrl: `api`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'same-origin',
    // credentials: 'include',
  }),
  tagTypes: [
    constants.USER_PROFILE_TAG,
    constants.COMPANIES_TAG,
    constants.JOB_POSTS_TAG,
    // constants.USER_RACES_TAG,
    // constants.RACE_DATA_TAG,
    // constants.USER_GENERAL_STATS_TAG,
    // constants.USER_IMPROVE_STATS_TAG,
    // constants.USER_PRACTICE_DATA_TAG,
    // constants.USER_FEEDBACK_TAG,
    // constants.USER_PROPOSAL_TEXT_TAG,
    // constants.USER_SETTING_TAG,
    // constants.PAYMENT_TAG,
    // constants.USER_PROFILE_DETAILS_BY_ID_TAG,
  ],
  endpoints: () => ({}),
});

export default itJobsBoardApi;
