import { coreApi } from './core.api';
import { User } from '@acme/shared-models';

export const userApi = coreApi
  .enhanceEndpoints({
    addTagTypes: ['User'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query<User[], void>({
        query: () => `users`,
      }),
      getUser: builder.query<User, number>({
        query: (id) => `users/${id}`,
      }),
    }),
  });

export const { useGetUserQuery, useGetUsersQuery } = userApi;
