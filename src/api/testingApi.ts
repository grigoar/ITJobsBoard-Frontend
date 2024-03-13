import itJobsBoardApi from './indexITJobsBoardApi';

const testingApi = itJobsBoardApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getServerHealth: builder.query<string, void>({
      query: () => {
        return {
          url: 'health',
          responseHandler: (response) => {
            return response.text();
          },
        };
      },
      keepUnusedDataFor: 10,
      // transformResponse: (response: string) => JSON.stringify(response),
    }),
    testingCountryIP: builder.query<string, string>({
      query: (ipLookup: string) => {
        return {
          url: `testing/testingCountryIP?ipLookup=${ipLookup}`,
        };
      },
      keepUnusedDataFor: 10,
    }),

    testingServerFailure: builder.query<string, void>({
      query: () => {
        return {
          url: `testing/testingServerFailure`,
        };
      },
    }),
  }),
});

export const { useLazyGetServerHealthQuery, useTestingCountryIPQuery, useTestingServerFailureQuery } = testingApi;
