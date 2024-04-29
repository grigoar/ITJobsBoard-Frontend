import itJobsBoardApi from '@/api/indexITJobsBoardApi';
import { rtkQueryErrorLogger } from '@/api/ServerErrorsMiddleware';
import { configureStore } from '@reduxjs/toolkit';
import appGlobalSettingsSliceReducer from './slices/appGlobalSettings';
import counterSliceReducer from './slices/counterSlice';
import userDataSliceReducer from './slices/userDataSlice';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      userData: userDataSliceReducer,
      appGlobalSettings: appGlobalSettingsSliceReducer,
      counter: counterSliceReducer,
      [itJobsBoardApi.reducerPath]: itJobsBoardApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryErrorLogger, itJobsBoardApi.middleware),
  });
  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
