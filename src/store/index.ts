import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';

// import { setupListeners } from '@reduxjs/toolkit/dist/query';
// import userDataSliceReducer from './slices/userDataSlice';
import itJobsBoardApi from '@/api/indexITJobsBoardApi';
import { rtkQueryErrorLogger } from '@/api/ServerErrorsMiddleware';
import counterSliceReducer from './slices/counterSlice';
import appGlobalSettingsSliceReducer from './slices/appGlobalSettings';
// import typingMuscleApi from '../services/typingMuscleApis';
// import raceStatsReducer from './slices/raceStatsSlice';
// import practiceRaceStatsReducer from './slices/practiceRaceStatsSlice';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      // userData: userDataSliceReducer,
      appGlobalSettings: appGlobalSettingsSliceReducer,
      counter: counterSliceReducer,
      [itJobsBoardApi.reducerPath]: itJobsBoardApi.reducer,

      // raceStats: raceStatsReducer,
      // practiceRaceStats: practiceRaceStatsReducer,
      // // * Add the generated reducer as a specific top-level slice
      // [typingMuscleApi.reducerPath]: typingMuscleApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryErrorLogger, itJobsBoardApi.middleware),
  });
  return store;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// setupListeners(store.dispatch);
// export default store;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
