import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './apis/user.api';

export const storeConfig = {
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat([userApi.middleware]),
};

export const store = configureStore(storeConfig);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
