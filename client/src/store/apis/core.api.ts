import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coreApi = createApi({
  reducerPath: 'UserApi',
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`,
  }),
  endpoints: () => ({}),
});
